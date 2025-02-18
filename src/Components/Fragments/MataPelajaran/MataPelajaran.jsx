import { useParams } from "react-router-dom";
import Semester from "./Semester";
import CardMataPelajaran from "./CardMataPelajaran";
import {
  getAllMataPelajaran,
  getSemester,
} from "../../../Services/main.service";
import { useEffect, useState } from "react";
import { formatNextYear } from "../../../helper/date";

const MataPelajaran = () => {
  const { idKelas } = useParams();

  const [dataSemester, setDataSemester] = useState([]);
  const [idSemester, setIdSemester] = useState(null);
  const [dataMataPelajaran, setDataMataPelajaran] = useState([]);

  // load semester
  const loadSemester = () => {
    getSemester(idKelas, (status, res) => {
      if (status) {
        setDataSemester(res);
      } else {
        console.error("Error response ", res);
        setDataSemester([]);
      }
    });
  };

  useEffect(() => {
    loadSemester();
  }, []);

  // load mata pelajaran with id semester
  const loadMataPelajaran = (semesterId) => {
    if (!semesterId) return;
    console.log("semesterId ", semesterId);

    getAllMataPelajaran(semesterId, (status, res) => {
      if (status) {
        setDataMataPelajaran(res);
      } else {
        console.error("Error response ", res);
        setDataMataPelajaran([]);
      }
    });
  };

  useEffect(() => {
    loadMataPelajaran(idSemester);
  }, [idSemester]);

  return (
    <div className="flex flex-col">
      {/* semester */}
      <Semester data={dataSemester} getIdSemester={setIdSemester} />

      <div className="grid grid-cols-3 gap-5 mb-4">
        {dataMataPelajaran.length > 0 ? (
          dataMataPelajaran.map((mp) => (
            <CardMataPelajaran
              key={mp.idMp}
              title={mp.namaMataPelajaran}
              tahunajaran={formatNextYear(mp.tahunAjaran)}
              action="Buka RPP"
            />
          ))
        ) : (
          <CardMataPelajaran title="Pilih Semester" tahunajaran="-"  />
        )}
      </div>
    </div>
  );
};

export default MataPelajaran;
