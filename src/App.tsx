import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Room from "./pages/Room";
import VsPlayer from "./pages/VsPlayer";
import Register from "./pages/Auth/Register";
import useAuthStore from "./store/AuthStore";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Auth from "./components/Auth";
import { ModalContainer } from "./components/ModalContainer";

function App() {
  const { token } = useAuthStore()

  return (
    <>
      <BrowserRouter>
        <Routes>
          {import.meta.env.VITE_IsProd ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/game" element={<Game />} />
            </>
          ) : (
            <Route element={<ProtectedRoutes isAllowed={token as string} />}>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/vs" element={<VsPlayer />} />
              <Route path="/rooms" element={<Room />} />
            </Route>
          )}

          <Route path="/signup" element={<Register />} />
          <Route
            path="/signin"
            element={<Auth isAuthenticated={token as string} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
      <ModalContainer />
    </>
  );
}

export default App;
