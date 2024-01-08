import { create } from "zustand";
import { Howl } from "howler";

interface State {
  sound: Howl;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  playMusic: () => void;
  stopMusic: () => void;
  changeVolume: (param: number | null) => void;
}

const sound = new Howl({
  src: ["electroman.mp3"],
  html5: true,
  loop: true,
  volume: 0.1,
});

export const useSongStore = create<State>((set) => ({
  sound: sound,
  isPlaying: false,
  setIsPlaying: (state: boolean) => set({ isPlaying: state }),
  playMusic: () => {
    sound.play();
  },
  stopMusic: () => {
    sound.stop();
  },
  changeVolume: (volume: number | null) => {
    sound.volume(volume as number);
  },
}));
