import { FC, ReactNode } from "react";

const TransparentButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <button className="bg-transparent hover:bg-slate-200/60 rounded-full focus:ring-2 ring-indigo-400 focus:outline-none font-medium lg:px-4 lg:py-2 md:text-base px-3 py-1 text-sm transition-all duration-150 capitalize w-fit flex flex-row gap-3 items-center group">
      {children}
    </button>
  );
};

export default TransparentButton;
