import { useState } from "react";
import { useSongStore } from "../store/SongStore";
import { BsVolumeDown, BsVolumeUp } from "react-icons/bs";

type Props = {
  handleClose: () => void;
};

const ConfigurationModal = ({ handleClose }: Props) => {
  const { changeVolume, sound } = useSongStore();
  const [volume, setVolume] = useState(sound.volume());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newVolume = Number(event?.target.value);
    setVolume(newVolume);
    changeVolume(newVolume);
  };

  const handleVolumeUp = () => {
    setVolume(1);
    changeVolume(1);
  };

  const handleVolumeDown = () => {
    setVolume(0);
    changeVolume(0);
  };
  return (
    <div className="flex flex-col gap-2 p-2">
      <section
        className="flex flex-row justify-end  text-red-600"
        onClick={handleClose}
      >
        <strong className="text-sm">X</strong>
      </section>
      <form className="flex flex-col items-center gap-2 p-2">
        <h5 className="text-white text-sm">CONFIGURATION</h5>
        <label className="text-white" htmlFor="">
          Volume
        </label>
        <section className="flex gap-2 text-white">
          <button type="button" onClick={handleVolumeDown}>
            <BsVolumeDown />
          </button>
          <input
            value={volume}
            min="0"
            max="1"
            step="0.01"
            type="range"
            onChange={handleChange}
          />
          <button type="button" onClick={handleVolumeUp}>
            <BsVolumeUp />
          </button>
        </section>
      </form>
    </div>
  );
};

export default ConfigurationModal;
