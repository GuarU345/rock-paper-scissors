import { Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";

type Props = {
  isAuthenticated: string;
};

const Auth = ({ isAuthenticated }: Props) => {
  if (isAuthenticated) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default Auth;
