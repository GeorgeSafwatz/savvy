import { FC, Fragment, useEffect, useState } from "react";
import Button from "../General-UI/Button";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { NavLink } from "react-router-dom";
import {
  clearCart,
  decrease,
  increase,
  removeItem,
} from "../../context/cartSlice";
import { setSearchTerm } from "../../context/searchTermSlice";
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
        className="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full bg-black/40"
      ></motion.div>
    )
  );
};

export const Overlay: FC<{
  direction: Directions;
  clickHandler: () => void;
  toggle: boolean;
}> = ({ direction, clickHandler }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { auth } = useSelector((state: RootState) => state.user);
  const { cartValue } = useSelector((state: RootState) => state.cart);
  const action = useDispatch();

  let totalPrice = 0;
  cartValue.forEach((i) => {
    totalPrice += i.price * i.quantity;
  });
  useEffect(() => {
    const cartList = JSON.stringify(cartValue);
    localStorage.setItem("cart", cartList);
  }, [cartValue]);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
        clickHandler();
      }, 3500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  const purchaseHandler = () => {
    setIsSuccess(true);
    action(clearCart());
  };
  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className={`fixed z-40 top-0 md:w-1/2 w-3/4 bg-white flex flex-col gap-4 overflow-y-auto h-full ${
        direction === "left" ? "left-0" : direction === "right" && "right-0"
      }`}
    >
      <section className="flex flex-col items-start w-full gap-2 p-2 bg-slate-100">
        <Button clickHandler={clickHandler}>x</Button>
        <p className="self-center p-2 text-xl font-semibold capitalize">
          Your Cart: {`$${totalPrice.toFixed(2)}`}
        </p>
      </section>
      <ul className="flex flex-col gap-2 divide-y-2 divide-slate-200 overflow-y-auto h-full">
        {cartValue.length === 0 ? (
          <p className="text-center self-center font-medium text-xl">
            {isSuccess ? (
              <span className="text-green-500">
                Thank you, your order has been received!
              </span>
            ) : (
              "there's no items"
            )}
          </p>
        ) : (
          cartValue.map((item) => {
            const price = item.quantity * item.price;
            return (
              <section
                key={item.id}
                className="flex flex-row w-full gap-2 px-2 py-4 transition-all duration-300 bg-white hover:bg-indigo-100"
              >
                <NavLink to={`item/${item.id}`}>
                  <img
                    src={`https://${item.img}`}
                    alt={item.productName}
                    className="object-scale-down object-center w-16 h-16 transition-all duration-150 rounded-md md:h-20 md:w-20 bg-slate-200"
                  />
                </NavLink>
                <section className="flex flex-col w-full gap-2">
                  <p className="text-xl font-semibold">{item.productName}</p>
                  <section className="flex flex-row justify-between w-full gap-2">
                    <div className="flex flex-row gap-2 w-fit">
                      <Button clickHandler={() => action(increase(item))}>
                        +
                      </Button>
                      <p className="text-lg font-semibold self-center">
                        {item.quantity}
                      </p>
                      <Button clickHandler={() => action(decrease(item))}>
                        -
                      </Button>
                    </div>
                    <p className="text-lg font-semibold self-center">
                      {`$${price.toFixed(2)}`}
                    </p>
                    <div className="justify-self-end">
                      <Button clickHandler={() => action(removeItem(item))}>
                        delete item
                      </Button>
                    </div>
                  </section>
                </section>
              </section>
            );
          })
        )}
      </ul>
      {auth ? (
        <button
          onClick={purchaseHandler}
          disabled={cartValue.length === 0 ? true : false}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-2 capitalize font-medium text-lg md:text-xl hover:bg-indigo-400 bg-indigo-500 transition-all duration-150 text-white w-fit rounded-full disabled:bg-slate-300 disabled:text-slate-600"
        >
          Purchase
        </button>
      ) : (
        <NavLink
          to={"/auth/signup"}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-2 capitalize font-medium text-lg md:text-xl hover:bg-indigo-400 bg-indigo-500 transition-all duration-150 group text-white w-fit rounded-full"
          onClick={() => action(setSearchTerm(""))}
        >
          you have to <span className={`group-hover:underline`}>Register</span>
        </NavLink>
      )}
    </motion.aside>
  );
};

const CartModal: FC<{
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

export default CartModal;
