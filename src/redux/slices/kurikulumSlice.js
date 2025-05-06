import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fase: null,
  kelas: null,
  mapel: null,
};

const kurikulumSlice = createSlice({
  name: "kurikulum",
  initialState,
  reducers: {
    setFase: (state, action) => {
      state.fase = action.payload;
    },
    setKelas: (state, action) => {
      state.kelas = action.payload;
    },

    setMapel: (state, action) => {
      state.mapel = action.payload;
    },
  },
});

export const { setFase, setKelas, setMapel } = kurikulumSlice.actions;
export default kurikulumSlice.reducer;
