import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";
import VsPlayer from "./pages/VsPlayer";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AuthProvider from "./contexts/AuthContext";
import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route
            path="/home"
            element={
              <AuthProvider>
                <Home />
              </AuthProvider>
            }
          />
          <Route
            path="/vs"
            element={
              <AuthProvider>
                <VsPlayer />
              </AuthProvider>
            }
          />
          <Route
            path="/rooms"
            element={
              <AuthProvider>
                <Room />
              </AuthProvider>
            }
          />

          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/signin"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
