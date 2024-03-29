import AnimationText from "../../components/AnimationText";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import { SigninBody } from "../../types";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useSongStore } from "../../store/SongStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login } = useAuthStore();
  const [authenticated, isAuthenticated] = useState(false);
  const { playMusic } = useSongStore();

  const onSubmit = handleSubmit(async (data) => {
    login(data as SigninBody, reset);
    isAuthenticated(true);
    playMusic();
  });

  return (
    <>
      {authenticated ? (
        <Loading />
      ) : (
        <section className="flex flex-col justify-center h-screen p-4">
          <AnimationText />
          <div className="sm:grid sm:place-content-center">
            <h3 className="text-2xl text-white mb-2">Login</h3>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <input
                className="outline-none text-sm rounded-md p-2"
                placeholder="ingresa tu email"
                {...register("identity", { required: "email requerido" })}
              />
              <input
                className="outline-none text-sm rounded-md p-2"
                placeholder="ingresa tu contraseña"
                type="password"
                {...register("password", { required: "contreña requerida" })}
              />
              {errors.exampleRequired?.type === "required" && (
                <span className="red">este campo es requerido</span>
              )}
              <button
                className="nes-btn"
                disabled={import.meta.env.VITE_IsProd ? true : false}
              >
                Login
              </button>
              <Link to="/signup" className="text-white text-center">
                Dont have account? Signup!
              </Link>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
