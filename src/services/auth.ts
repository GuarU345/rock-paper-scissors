import axios from "axios";
import { SigninBody, SignupBody } from "../types";

const API_URL = "http://127.0.0.1:8090/api/collections";

const signup = async (body: SignupBody) => {
  const { data } = await axios.post(`${API_URL}/users/records`, body);
  return data;
};

const signin = async (body: SigninBody) => {
  const {data} = await axios.post(`${API_URL}/users/auth-with-password`,body)
  return data.token
}

export { signup, signin };
