import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/auth/Input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUserFn } from "../../../hooks/useUserFn";
import { AuthError } from "firebase/auth";
import Toast from "../../../components/General-UI/Toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../context/searchTermSlice";
import { Helmet } from "react-helmet";

interface UserData {
  email: string;
  password: string;
  displayName: string;
}
const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useUserFn();
  const sendUserData = async (data: UserData) => {
    try {
      await signup(data);
      return true;
    } catch (error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/user-not-found":
          throw new Error("User isn't found");
        case "auth/wrong-password":
          throw new Error("Wrong password");
        case "auth/invalid-email":
          throw new Error("Invalid email");
        case "auth/email-already-in-use":
          throw new Error("email already in use");
        case "auth/invalid-app-credential":
          throw new Error("Something went wrong, checkout your internet");
        case "auth/network-request-failed":
          throw new Error("Something went wrong, checkout your internet");

        default:
          break;
      }
    }
  };
  const { mutate, isLoading, isError, isSuccess, error, isPaused } =
    useMutation({
      mutationFn: (data: UserData) => sendUserData(data),
      onError: (error: Error) => error,
    });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<UserData>({ mode: "onTouched" });
  const submitHandler: SubmitHandler<UserData> = (data) => {
    mutate(data);
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/;
  const nameRegex = /^[A-Za-z '-]+$/;

  const { state } = useLocation();
  const action = useDispatch();
  const path = state ? state.path.split("/") : "";
  useEffect(() => {
    if (isSuccess) {
      action(
        setSearchTerm(
          path.length === 3 && path[1] === "search"
            ? path[2]
            : path.length === 2
            ? path[1]
            : ""
        )
      );
      setTimeout(() => {
        navigate(state.path || "/");
      }, 3000);
    }
  }, [action, isSuccess, navigate, path, state]);
  return (
    <article className="flex flex-col items-center rounded-md border-slate-300 border-2 w-3/4 mx-auto p-8 gap-4 shadow-md">
      <Helmet>
        <title>Sign Up - Savvy</title>

        <meta
          name="description"
          content="Sign Up to your account on Savvy online store. Access your orders, saved items, and account settings after logging in."
        />

        <meta property="og:title" content="Sign Up - Savvy" />

        <meta
          property="og:description"
          content="Sign Up to your account on Savvy online store. Access your orders, saved items, and account settings after logging in."
        />
      </Helmet>
      <h3 className="text-xl md:text-2xl font-semibold">Sign up</h3>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 md:text-lg w-full"
      >
        <Input
          error={errors.email}
          name="email"
          reg={register("email", {
            required: { value: true, message: "Please enter an email" },
            pattern: {
              value: emailRegex,
              message: "Email example: username@domain.com",
            },
          })}
        >
          Email:
        </Input>
        <Input
          error={errors.displayName}
          name="displayName"
          reg={register("displayName", {
            required: { value: true, message: "Please enter your name" },
            pattern: {
              value: nameRegex,
              message: "Please enter a valid name, no numbers are allowed",
            },
          })}
        >
          Name:
        </Input>
        <Input
          error={errors.password}
          name="password"
          reg={register("password", {
            required: { value: true, message: "Please enter an password" },
            pattern: {
              value: passwordRegex,
              message:
                "Password should contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number",
            },
          })}
        >
          Password:
        </Input>
        <button
          type="submit"
          disabled={!isValid || !isDirty || isLoading || isSuccess}
          className="px-3 py-1 rounded-md capitalize bg-indigo-500 hover:bg-indigo-600 text-white md:px-4 md:py-2 md:text-lg disabled:bg-slate-300 disabled:text-slate-600 font-medium center w-1/2 self-center"
        >
          Sign up
        </button>
      </form>
      <section>
        <section className="flex flex-row gap-4 md:gap-6">
          <NavLink
            to={"/auth/login"}
            aria-disabled={isLoading}
            className={`capitalize underline text-blue-500`}
          >
            login
          </NavLink>
          <button
            disabled={isLoading}
            onClick={() => reset()}
            className="focus:outline-none capitalize underline text-slate-400 bg-transparent focus:ring-2 ring-indigo-400"
          >
            reset
          </button>
        </section>
      </section>
      {isSuccess && (
        <Toast
          title="You have been registered successfully"
          status="successful"
        />
      )}
      {isError && <Toast title={error.message} status="error" />}
      {isPaused && <Toast title="Waiting for internet connection..." />}
    </article>
  );
};

export default SignUp;
