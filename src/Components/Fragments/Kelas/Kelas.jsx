import { useEffect, useState } from "react";
import { getAllKelas } from "../../../Services/main.service";
import { ensureArray } from "../../../helper/formattedtext";
import { useParams } from "react-router-dom";
import CardKelas from "./CardKelas";
import useTitleBrowser from "../../../Hooks/useTitle";

const Kelas = () => {
  useTitleBrowser("Kelas");
  const [dataKelas, setDataKelas] = useState([]);
  const { id } = useParams();

  const loadKelas = () => {
    getAllKelas(id, (status, res) => {
      setDataKelas(status ? ensureArray(res.data) : []);
    });
  };

  useEffect(() => {
    loadKelas();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 mb-4">
      {dataKelas.length > 0 ? (
        dataKelas.map((fase) => (
          <CardKelas
            key={fase.idKelas}
            title={fase.namaKelas}
            action="Buka"
            id={fase.idFase}
            idKelas={fase.idKelas}
          />
        ))
      ) : (
        <CardKelas title="Tidak ada data" />
      )}
    </div>
  );
};

export default Kelas;
