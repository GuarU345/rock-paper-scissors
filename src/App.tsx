import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";
import VsPlayer from "./pages/VsPlayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/vs" element={<VsPlayer />} />
          <Route path="/rooms" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
