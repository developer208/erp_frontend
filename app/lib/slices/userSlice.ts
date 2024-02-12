import { createSlice } from "@reduxjs/toolkit";

interface a {
  username: string;
  password: string;
}

const initialState: a = {
  username: "",
  password: "",
};

export const userSlice = createSlice({
  name: "USER",
  initialState: initialState,
  reducers: {
    LogIn: (state, action) => {
      (state.username = action.payload.username),
        (state.password = action.payload.password);
    },
    LoggedOut: (state, action) => {
      (state.username = ""), (state.password = "");
    },
  },
});

export const { LogIn, LoggedOut } = userSlice.actions;
export default userSlice.reducer;
