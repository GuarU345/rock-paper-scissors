import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";
import VsPlayer from "./pages/VsPlayer";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/vs" element={<VsPlayer />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
