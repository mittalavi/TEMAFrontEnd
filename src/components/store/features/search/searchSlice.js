import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setvalue: (state,action)=>{
        state.searchValue = action.payload;
    },
    reset: (state) => {
      state.searchValue = "";
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
