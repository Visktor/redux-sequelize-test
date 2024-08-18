import { createSlice } from "@reduxjs/toolkit";

type ErrorKeys = "email" | "password";

type LoginState = {
  email: string;
  password: string;
  showPassword: boolean;
  inputErrors: Record<ErrorKeys, boolean>;
};

const initialState: LoginState = {
  email: "",
  password: "",
  showPassword: false,
  inputErrors: {
    email: false,
    password: false,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export default loginSlice.reducer;

export const { setEmail, setPassword } = loginSlice.actions;
