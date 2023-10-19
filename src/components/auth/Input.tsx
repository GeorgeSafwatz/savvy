import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const Input: FC<{
  children: string;
  error: FieldError | undefined;
  name: string;
  reg: UseFormRegisterReturn<"email" | "displayName" | "password">;
}> = ({ children, error, name, reg }) => {
  return (
    <section className=" space-y-2">
      <label
        className="block text-gray-700 font-bold mb-2 capitalize"
        htmlFor={`${name}`}
      >
        {children}
      </label>
      <input
        className={`shadow appearance-none border ${
          error ? "border-red-500" : "border-gray-400"
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        type={name}
        id={name}
        {...reg}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </section>
  );
};

export default Input;
