import AnimationText from "../../components/AnimationText";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    login(data, reset);
  });

  return (
    <div className="grid h-screen place-content-center">
      <AnimationText />
      <h3 className="text-2xl mb-2">Login</h3>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          className="outline-none rounded-md p-2"
          placeholder="ingresa tu email o username"
          {...register("identity", { required: "email requerido" })}
        />
        <input
          className="outline-none rounded-md p-2"
          placeholder="ingresa tu contraseña"
          type="password"
          {...register("password", { required: "contreña requerida" })}
        />
        {errors.exampleRequired?.type === "required" && (
          <span className="red">este campo es requerido</span>
        )}
        <button className="text-white border-2">Login</button>
        <Link to="/signup" className="text-white text-center">
          Dont have account? Signup!
        </Link>
      </form>
    </div>
  );
};

export default Login;
