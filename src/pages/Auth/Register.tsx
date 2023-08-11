import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { BsScissors } from "react-icons/bs";
import { GiStoneBlock } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";
import { signup } from "../../services/auth";
import { SignupBody } from "../../types";
import { toast } from "sonner";

const Register = () => {
  const elementRef = useRef<HTMLDivElement>(null);
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
      toast("Something Bad");
    }
  });

  useEffect(() => {
    if (elementRef.current) {
      const elementsToAppear =
        elementRef.current?.querySelectorAll(".animate-appear");

      elementsToAppear?.forEach((element) => {
        element.classList.remove("opacity-0");
      });
    }
  }, []);

  return (
    <div className="grid h-screen place-content-center">
      <div
        className="grid place-content-center text-center text-white text-6xl"
        ref={elementRef}
      >
        <h1 className="font-bold flex justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-900 ease-in animate-appear xl:text-8xl">
          <span className="text-gray-400">
            <GiStoneBlock />
          </span>
          Rock
        </h1>
        <h1 className="font-bold text-white  flex justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-500 ease-in animate-appear xl:text-8xl">
          Paper
          <span>
            <IoIosPaper className="text-yellow-400" />
          </span>
        </h1>
        <h1 className="font-bold text-white  flex justify-center mb-4 opacity-0 transition-opacity duration-1000 delay-700 ease-in animate-appear xl:text-8xl">
          Sciss
          <span>
            <BsScissors className="text-red-600" />
          </span>
          ors
        </h1>
        <h3 className="text-2xl mb-2">Register</h3>
      </div>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          className="outline-none rounded-md p-2"
          placeholder="ingresa tu username"
          {...register("name")}
        />
        <input
          className="outline-none rounded-md p-2"
          placeholder="ingresa tu email"
          {...register("email")}
        />
        <input
          className="outline-none rounded-md p-2"
          placeholder="ingresa tu contraseña"
          type="password"
          {...register("password", { required: "contreña requerida" })}
        />
        <input
          className="outline-none rounded-md p-2"
          placeholder="vuelve a ingresar tu contraseña"
          type="password"
          {...register("passwordConfirm", {
            required: "contraseña requerida",
          })}
        />
        {errors.exampleRequired?.type === "required" && (
          <span className="red">este campo es requerido</span>
        )}
        <button className="text-white border-2">Add</button>
      </form>
    </div>
  );
};

export default Register;
