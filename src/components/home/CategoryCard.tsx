import { FC } from "react";
import Button from "../General-UI/Button";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const CategoryCard: FC<{
  image: string;
  children: string;
  takesTwoGrid?: boolean;
}> = ({ image, children, takesTwoGrid }) => {
  const path = children.split(" ");
  return (
    <NavLink
      to={`/${path[1].toLowerCase()}`}
      className={`relative rounded-md overflow-hidden  h-60 md:h-72 lg:h-80 p-3 flex flex-col justify-end items-center transition-all duration-150 ${
        takesTwoGrid && "lg:col-span-3 col-span-1"
      }`}
    >
      <motion.img
        src={image}
        alt={children}
        className="absolute top-0 left-0 object-cover object-center w-full h-full bg-slate-300"
        whileHover={{ scale: 1.1 }}
      />
      <Button dropshadow>{children}</Button>
    </NavLink>
  );
};

export default CategoryCard;
