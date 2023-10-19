import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../context/searchTermSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Dropdown: FC<{
  items: string[];
  hoveredItem: string;
  buttonLabel: string;
  setHoveredItem: (data: string) => void;
}> = ({ items, buttonLabel, hoveredItem, setHoveredItem }) => {
  const navigate = useNavigate();
  const action = useDispatch();
  return (
    <AnimatePresence mode="popLayout">
      {hoveredItem === buttonLabel && (
        <motion.ul
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              staggerChildren: 0.3,
              when: "beforeChildren",
            },
          }}
          exit={{
            opacity: 0,
          }}
          className="absolute left-0 z-20 px-1 py-1 text-sm translate-y-full bg-white -bottom-2 md:py-2 md:text-base h-fit"
          onMouseEnter={() => setHoveredItem(buttonLabel)}
          onMouseLeave={() => setHoveredItem("")}
        >
          {items.map((item, i) => (
            <NavLink to={`/search/${item.replace(" ", "+").toLowerCase()}`}>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full h-full p-2 transition-all duration-200 bg-white cursor-pointer hover:bg-slate-200 whitespace-nowrap"
                key={i}
                onClick={() => {
                  action(setSearchTerm(item));
                  navigate(`/search/${item}`);
                }}
              >
                <button>{item}</button>
              </motion.li>
            </NavLink>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
