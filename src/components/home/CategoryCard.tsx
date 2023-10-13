import { FC } from "react";
import Button from "../General-UI/Button";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const CategoryCard: FC<{
  image: string;
  children: string;
  takesTwoGrid?: boolean;
}> = ({ image, children, takesTwoGrid }) => {
  return (
    <NavLink
      to={`/`}
      className={`relative rounded-md overflow-hidden  h-60 md:h-72 lg:h-80 p-3 flex flex-col justify-end items-center transition-all duration-150 ${
        takesTwoGrid && "col-span-2 lg:col-span-1"
      }`}
    >
      <motion.img
        src={image}
        alt={children}
        className="absolute top-0 left-0 object-cover object-center w-full h-full"
        whileHover={{ scale: 1.1 }}
      />
      <Button dropshadow>{children}</Button>
    </NavLink>
  );
};

export default CategoryCard;
