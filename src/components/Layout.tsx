import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { socket } from "../socket/socket";
import { useSongStore } from "../store/SongStore";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";

type Props = {
  children?: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { setToken, setUserId } = useAuthStore();
  const { stopMusic, changeVolume, sound } = useSongStore();
  const [actualVolume, setActualVolume] = useState(sound.volume());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pocketbase_auth");
    setToken(null);
    setUserId(null);
    socket.disconnect();
    stopMusic();
    navigate("/");
  };

  const handleVolumeMute = () => {
    if (sound.volume() === 0) {
      changeVolume(actualVolume);
      setActualVolume(sound.volume());
      return;
    }
    setActualVolume(sound.volume());
    changeVolume(0);
  };

  return (
    <div>
      <section className="flex justify-end p-2">
        <button onClick={handleVolumeMute} className="nes-btn">
          {actualVolume === 0 ? <BsVolumeUp /> : <BsVolumeMute />}
        </button>
        {!import.meta.env.VITE_IsProd ? (
          <button
            onClick={handleLogout}
            className="nes-btn is-error text-white"
          >
            Logout
          </button>
        ) : null}
      </section>
      {children}
    </div>
  );
};

export default Layout;
