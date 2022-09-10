import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "All",
  colors: [],
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    changeColor: (state, action) => {
      const { color, changeType } = action.payload;

      if (changeType === "removed") {
        state.colors = state.colors.filter((c) => c !== color);
      } else {
        state.colors = [...state.colors, color];
      }
    },
  },
});

export default filterSlice.reducer;
export const { changeColor, changeStatus } = filterSlice.actions;
