import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";
import VsPlayer from "./pages/VsPlayer";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vs" element={<VsPlayer />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
