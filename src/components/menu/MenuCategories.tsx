import { FC } from "react";
import { ChevronDown } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";

const MenuCategories: FC<{
  title: string;
  img: string;
  clickHandler: () => void;
}> = ({ img, title, clickHandler }) => {
  return (
    <NavLink
      to={`/${title}`}
      className="flex flex-row justify-between p-4 group hover:bg-slate-200"
      onClick={clickHandler}
    >
      <section className="flex flex-row items-center gap-3 ">
        <img
          src={img}
          alt={title}
          className="object-scale-down object-center w-8 h-8 rounded-md bg-slate-200"
        />
        <p className="capitalize">{title}</p>
      </section>
      <i className="hidden -rotate-90 group-hover:block">
        <ChevronDown />
      </i>
    </NavLink>
  );
};

export default MenuCategories;
