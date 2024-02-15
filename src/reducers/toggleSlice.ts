import { createSlice } from "@reduxjs/toolkit";
import { ActionSlices, ToggleSlice } from "src/types";

const initialState: ToggleSlice = {
  toggleState: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: initialState,
  reducers: {
    setToggleStatus: (state, action) => {
      state.toggleState = action.payload;
    },
  },
});

const { actions, reducer } = toggleSlice;

export const { setToggleStatus } = actions;
export const getToggleState = (state: ActionSlices) => state.toggle;
export default reducer;
