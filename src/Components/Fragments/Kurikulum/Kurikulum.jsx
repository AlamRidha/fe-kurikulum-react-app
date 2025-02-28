import { useParams } from "react-router-dom";
import CardKurikulum from "./CardKurikulum";

const Kurikulum = () => {
  const { id, idKelas, idMp } = useParams();

  console.log("Params ", useParams());
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardKurikulum
        title="Capaian Pembelajaran"
        action="Buka"
        menu="cp"
        idFase={id}
        idKelas={idKelas}
        idMp={idMp}
      />
      <CardKurikulum
        title="Tujuan Pembelajaran"
        action="Buka"
        menu="tp"
        idFase={id}
        idKelas={idKelas}
        idMp={idMp}
      />
      <CardKurikulum
        title="Alur Tujuan Pembelajaran"
        action="Buka"
        menu="atp"
        idFase={id}
        idKelas={idKelas}
        idMp={idMp}
      />
      <CardKurikulum
        title="Asesmen"
        action="Buka"
        menu="asesmen"
        idFase={id}
        idKelas={idKelas}
        idMp={idMp}
      />
      <CardKurikulum
        title="Modul Pembelajaran"
        action="Buka"
        menu="modulp"
        idFase={id}
        idKelas={idKelas}
        idMp={idMp}
      />
    </div>
  );
};

export default Kurikulum;
