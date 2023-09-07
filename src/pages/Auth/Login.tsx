import AnimationText from "../../components/AnimationText";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../../contexts/AuthStore";
import { SigninBody } from "../../types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login } = useAuthStore();

  const onSubmit = handleSubmit(async (data) => {
    login(data as SigninBody, reset);
    <Navigate to={"/home"} />;
  });

  return (
    <>
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
            <button className="nes-btn">Login</button>
            <Link to="/signup" className="text-white text-center">
              Dont have account? Signup!
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
