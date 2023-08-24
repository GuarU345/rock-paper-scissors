import { ReactElement, ReactNode, createContext, useContext } from "react";
import { signin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { SigninBody, UserId } from "../types";
import { socket } from "../socket/socket";

interface AuthContextType {
  login: (data: SigninBody, reset: () => void) => Promise<void>;
  getToken: () => string | null;
  token: string | null;
  getUserInfo: () => UserId | null;
}

type MyContextProps = {
  children: ReactNode | ReactElement[];
};

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthProvider: React.FC<MyContextProps> = ({ children }) => {
  const [token] = useState<string | null>(localStorage.getItem("token"));
  const [userInfo] = useState(() => {
    const auth = localStorage.getItem("pocketbase_auth");
    if (auth === null) return {};
    return JSON.parse(auth);
  });

  const navigate = useNavigate();

  const login = async (data: SigninBody, reset: () => void) => {
    try {
      const response = await signin(data);
      localStorage.setItem("token", response);
      navigate("/home");
      socket.connect();
      toast.success("Login Successfully");
      reset();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const getToken = () => {
    return token;
  };

  const getUserInfo = () => {
    return userInfo;
  };

  return (
    <AuthContext.Provider value={{ login, getToken, token, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext, useAuth };
export default AuthProvider;
