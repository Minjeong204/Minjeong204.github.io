import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "count",
  initialState: { value: 0 },
  reducers: {
    plus: (state) => {
      state.value += 1;
    },
    minus: (state) => {
      state.value -= 1;
    },
    init: (state) => {
      state.value = 0;
    },
  },
});

export const { plus, minus, init } = counterSlice.actions;
export default counterSlice.reducer;
