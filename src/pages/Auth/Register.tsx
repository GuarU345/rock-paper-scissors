import { useForm } from "react-hook-form";
import { signup } from "../../services/auth";
import { SignupBody } from "../../types";
import { toast } from "sonner";
import AnimationText from "../../components/AnimationText";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signup(data as SignupBody);
      toast("Register Successfully");
      reset();
    } catch (error) {
      toast(`${error}`);
    }
  });

  return (
    <div className="flex flex-col justify-center h-screen p-4">
      <AnimationText />
      <div className="sm:grid sm:place-content-center">
        <h3 className="text-2xl text-white mb-2">Register</h3>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            className="outline-none text-sm rounded-md p-2"
            placeholder="ingresa tu username"
            {...register("name")}
          />
          <input
            className="outline-none text-sm rounded-md p-2"
            placeholder="ingresa tu email"
            {...register("email")}
          />
          <input
            className="outline-none text-sm rounded-md p-2"
            placeholder="ingresa tu contraseña"
            type="password"
            {...register("password", { required: "contreña requerida" })}
          />
          <input
            className="outline-none text-sm rounded-md p-2"
            placeholder="confirma contraseña"
            type="password"
            {...register("passwordConfirm", {
              required: "contraseña requerida",
            })}
          />
          {errors.exampleRequired?.type === "required" && (
            <span className="red">este campo es requerido</span>
          )}
          <button
            className="nes-btn"
            disabled={import.meta.env.VITE_IsProd ? true : false}
          >
            Add
          </button>
        </form>
      </div>
      <Link className="text-white text-center mt-2" to="/signin">
        Back to login
      </Link>
    </div>
  );
};

export default Register;
