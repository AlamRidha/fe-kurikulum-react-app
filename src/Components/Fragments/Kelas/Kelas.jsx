import { useEffect, useState } from "react";
import { getAllKelas } from "../../../Services/main.service";
import { ensureArray } from "../../../helper/formattedtext";
import { useParams } from "react-router-dom";
import CardKelas from "./CardKelas";

const Kelas = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const { id } = useParams();
  console.log(id);

  const handleAction = (id) => {
    console.log("Fase id", id);
  };

  const loadKelas = () => {
    getAllKelas(id, (status, res) => {
      console.log("ini data kelas", res);
      setDataKelas(status ? ensureArray(res) : []);
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
          />
        ))
      ) : (
        <CardKelas title="Tidak ada data" />
      )}
    </div>
  );
};

export default Kelas;
