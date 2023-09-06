import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactElement;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pocketbase_auth");
    navigate("/");
  };

  return (
    <div>
      <section className="flex justify-end p-2">
        <button onClick={handleLogout} className="nes-btn is-error text-white">
          Logout
        </button>
      </section>
      {children}
    </div>
  );
};

export default Layout;
