import { FC } from "react";
import { NavLink } from "react-router-dom";

const SubCategoryCard: FC<{ image: string; children: string }> = ({
  image,
  children,
}) => {
  return (
    <NavLink
      to={`/search/${children.replace(" ", "+").toLowerCase()}`}
      className="flex flex-col gap-2 md:gap-4 group hover:shadow-md hover:shadow-slate-900/30 rounded-md overflow-hidden transition-all duration-150"
    >
      <div className="h-56 md:h-72 overflow-hidden">
        <img
          src={image}
          alt={children}
          className="object-cover object-center h-full w-full group-hover:scale-110 transition-all duration-150 bg-slate-300"
        />
      </div>
      <p className="font-semibold text-lg md:text-xl p-2">{children}</p>
    </NavLink>
  );
};

export default SubCategoryCard;
