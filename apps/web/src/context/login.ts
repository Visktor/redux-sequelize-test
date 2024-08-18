import { createSlice } from "@reduxjs/toolkit";

type ErrorKeys = "email" | "password";

type LoginState = {
  email: string;
  password: string;
  showPassword: boolean;
  inputErrors: Record<ErrorKeys, string | null>;
};

const initialState: LoginState = {
  email: "",
  password: "",
  showPassword: false,
  inputErrors: {
    email: null,
    password: null,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    setErrors(state, action: { payload: Record<ErrorKeys, string | null> }) {
      state.inputErrors = action.payload;
    },
  },
});

export default loginSlice.reducer;

export const { setEmail, setPassword, setShowPassword, setErrors } =
  loginSlice.actions;
