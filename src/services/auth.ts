/* eslint-disable @typescript-eslint/no-explicit-any */
import { SigninBody, SignupBody } from "../types";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://rps-db.pockethost.io");

const signup = async (body: SignupBody) => {
  try {
    const { data } = await await pb.collection("users").create(body);
    return data;
  } catch (error: any) {
    if (error.response.data.email) {
      throw new Error(error.response.data.email.message);
    }
    if (error.response.data.passwordConfirm) {
      throw new Error(error.response.data.passwordConfirm.message);
    }
    throw new Error(error);
  }
};

const signin = async (body: SigninBody) => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(body.identity, body.password);
    return authData.token;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
};

export { signup, signin };
