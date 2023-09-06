import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../contexts/AuthStore";

type Props = {
  children?: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { token, setToken } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pocketbase_auth");
    setToken(null);
    navigate("/");
  };

  return (
    <div>
      <section className="flex justify-end p-2">
        <button
          disabled={!token}
          onClick={handleLogout}
          className="nes-btn is-error text-white"
        >
          Logout
        </button>
      </section>
      {children}
    </div>
  );
};

export default Layout;
