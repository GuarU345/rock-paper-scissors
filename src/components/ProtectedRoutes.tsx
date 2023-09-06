import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  children?: ReactElement;
  isAllowed: string;
};

const ProtectedRoutes = ({ children, isAllowed }: Props) => {
  if (!isAllowed) return <Navigate to={"/signin"} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
