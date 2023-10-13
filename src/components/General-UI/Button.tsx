import { FC, ReactNode } from "react";

const Button: FC<{
  children: ReactNode;
  dropshadow?: boolean;
}> = ({ children, dropshadow }) => {
  return (
    <button
      className={`bg-slate-50 hover:bg-slate-200 rounded-full focus:ring-2 ring-indigo-400 focus:outline-none font-medium
    ${dropshadow && "drop-shadow-lg shadow-slate-900/30"}
    lg:px-5 lg:py-3 
     md:text-lg
    px-4 py-2 text-base
    `}
    >
      {children}
    </button>
  );
};

export default Button;
