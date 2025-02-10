import { useEffect, useState } from "react";
import { getAllFase } from "../../../Services/main.service";
import { ensureArray } from "../../../helper/formattedtext";
import CardFase from "./CardFase";

const Fase = () => {
  const [dataFase, setDataFase] = useState([]);

  const handleAction = (id) => {
    console.log("Fase id", id);
  };

  const loadFase = () => {
    getAllFase((status, res) => {
      setDataFase(status ? ensureArray(res) : []);
    });
  };

  useEffect(() => {
    loadFase();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 mb-4">
      {dataFase.length > 0 ? (
        dataFase.map((fase) => (
          <CardFase
            key={fase.idFase}
            title={fase.namaFase}
            action="Buka"
            id={fase.idFase}
          />
        ))
      ) : (
        <CardFase title="Tidak ada data" />
      )}
    </div>
  );
};

export default Fase;
