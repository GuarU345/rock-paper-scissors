import axios from "axios";
import { SignupBody } from "../types";

const API_URL = "http://127.0.0.1:8090/api/collections";

const signup = async (body: SignupBody) => {
  const { data } = await axios.post(`${API_URL}/users/records`, body);
  return data;
};

export { signup };
