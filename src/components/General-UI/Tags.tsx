import { FC, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { setSearchTerm } from "../../context/searchTermSlice";
import Dropdown from "./Dropdown";
import { NavLink, useNavigate } from "react-router-dom";

const Tags: FC<{
  children: ReactNode;
  items: string[];
}> = ({ children, items }) => {
  const searchTerm = useSelector((store: RootState) => store.searchTerm);
  const action = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const clickHandler = () => {
    const buttonContent = children?.toLocaleString();
    action(setSearchTerm(buttonContent as string));
    navigate(`/search/${buttonContent}`);
  };

  const [hoveredItem, setHoveredItem] = useState<string>("");
  const getHoveredItem = (data: string) => {
    setHoveredItem(data);
  };
  const mouseEnterHandler = () => {
    setHoveredItem(children?.toLocaleString() as string);
  };
  const mouseLeaveHandler = () => {
    setHoveredItem("");
  };
  return (
    <NavLink
      to={`/${children?.toLocaleString().toLowerCase()}`}
      className="relative"
    >
      <button
        className={`
    md:px-3 md:py-2 md:text-lg
    px-2 py-1 text-base
    border-b-2 border-transparent transition-all duration-200 hover:bg-slate-200
    focus:outline-indigo-400
    focus:outline-2
    ${
      searchTerm.value.toLowerCase() === children?.toString().toLowerCase() &&
      "border-b-blue-400 text-blue-400"
    }
    `}
        onClick={clickHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {children}
      </button>
      <Dropdown
        buttonLabel={children?.toLocaleString() as string}
        hoveredItem={hoveredItem && hoveredItem}
        setHoveredItem={getHoveredItem}
        items={items}
      />
    </NavLink>
  );
};

export default Tags;
