import { FC, Fragment } from "react";
import Button from "../General-UI/Button";
import { createPortal } from "react-dom";
import { createAvatar } from "../../utils/createAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { NavLink } from "react-router-dom";
import MenuCategories from "../menu/MenuCategories";
import {
  sportswearCategory,
  accessoriesImage,
  clothesImage,
  giftHero,
} from "../../assets/images";
import { useUserFn } from "../../hooks/useUserFn";
import { motion } from "framer-motion";
type Directions = "left" | "right";

export const Backdrop: FC<{ clickHandler: () => void; toggle: boolean }> = ({
  clickHandler,
  toggle,
}) => {
  return (
    toggle && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={clickHandler}
        className="absolute top-0 bottom-0 left-0 right-0 z-30 w-full h-full bg-black/40"
      ></motion.div>
    )
  );
};

export const Overlay: FC<{
  direction: Directions;
  clickHandler: () => void;
  toggle: boolean;
}> = ({ direction, clickHandler }) => {
  const user = useSelector((state: RootState) => state.user);
  const { logout } = useUserFn();
  const displayName =
    user.displayName.split(" ").length === 1
      ? user.displayName
      : user.displayName.split(" ").length > 1 &&
        `${user.displayName.split(" ")[0]} ${user.displayName.split(" ")[1]}`;

  const path = window.location.pathname;
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className={`absolute z-40 top-0 w-80 bg-white flex flex-col gap-4 overflow-y-auto h-full ${
        direction === "left" ? "left-0" : direction === "right" && "right-0"
      }`}
    >
      <section className="flex flex-col items-end w-full px-2 py-4 bg-slate-100">
        <Button clickHandler={clickHandler}>x</Button>
        {user.auth ? (
          <>
            <section className="flex flex-row self-start gap-2">
              <div className="relative w-12 h-12 text-xl font-semibold text-white capitalize bg-indigo-600 rounded-full">
                <p className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
                  {createAvatar(user.displayName)}
                </p>
              </div>
              <p className="font-medium">
                Welcome, <br />
                {displayName}
              </p>
            </section>
            <Button clickHandler={() => logout()}> logout</Button>
          </>
        ) : (
          <section className="flex flex-col self-start gap-2">
            <p>Hi there!</p>
            <p>
              <NavLink
                to={"/auth/login"}
                className={"font-medium hover:underline"}
                state={{ path: path }}
                onClick={clickHandler}
              >
                Login
              </NavLink>{" "}
              or{" "}
              <NavLink
                to={"/auth/signup"}
                className={"font-medium hover:underline"}
                state={{ path: path }}
                onClick={clickHandler}
              >
                Sign Up
              </NavLink>
            </p>
          </section>
        )}
      </section>
      <section className="flex flex-col divide-y-2 divide-slate-200">
        <MenuCategories
          clickHandler={clickHandler}
          title="clothes"
          img={clothesImage}
        ></MenuCategories>
        <MenuCategories
          title="accessories"
          img={accessoriesImage}
          clickHandler={clickHandler}
        ></MenuCategories>
        <MenuCategories
          title="gift"
          img={giftHero}
          clickHandler={clickHandler}
        ></MenuCategories>
        <MenuCategories
          title="Sportswear"
          img={sportswearCategory}
          clickHandler={clickHandler}
        ></MenuCategories>
      </section>
    </motion.aside>
  );
};

const Modal: FC<{
  direction: Directions;
  clickHandler: () => void;
  toggle: boolean;
}> = ({ direction, clickHandler, toggle }) => {
  return (
    <Fragment>
      {createPortal(
        <Overlay
          toggle={toggle}
          direction={direction}
          clickHandler={clickHandler}
        />,
        document.getElementById("overlay") as HTMLDivElement
      )}
      {createPortal(
        <Backdrop clickHandler={clickHandler} toggle={toggle} />,
        document.getElementById("backdrop") as HTMLDivElement
      )}
    </Fragment>
  );
};

export default Modal;
