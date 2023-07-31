import { publicRequest } from "../requestMethod";
import { loginFailed, loginStart, loginSuccess, logout } from "./userSlice";
import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const result = await publicRequest.post("/login", user);
    dispatch(loginSuccess(result.data));
    toast.success("Login success");
    setTimeout(() => {
      window.location.href = "/adduser";
    }, 2000);
  } catch (error) {
    dispatch(loginFailed);
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const logoutSuccess = async (dispatch) => {
  dispatch(logout());
  window.location.href = "/";
};
