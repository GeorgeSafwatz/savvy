import { FC, ReactNode } from "react";

const Button: FC<{
  children: ReactNode;
  dropshadow?: boolean;
  secondary?: boolean;
  clickHandler?: () => void;
}> = ({ children, dropshadow, secondary, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={`${
        secondary
          ? "bg-indigo-400 text-white hover:bg-indigo-500 active:bg-indigo-600 ring-slate-100"
          : "bg-slate-50 hover:bg-slate-200 ring-indigo-400"
      }  rounded-full focus:ring-2  focus:outline-none font-medium
    ${dropshadow && "drop-shadow-lg shadow-slate-900/30"}
    lg:px-5 lg:py-3 
     md:text-lg
    px-4 py-2 text-base transition-all duration-150
    disabled:bg-slate-300 disabled:text-slate-600
    whitespace-nowrap capitalize
    `}
    >
      {children}
    </button>
  );
};

export default Button;
