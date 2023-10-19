import { useState } from "react";
import { CartIcon } from "../../assets/icons/icons";
import Button from "../General-UI/Button";
import { AnimatePresence } from "framer-motion";
import CartModal from "./CartMenu";

const CartContainer = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <section className="block">
      <Button clickHandler={toggleHandler}>
        <CartIcon />
      </Button>
      <AnimatePresence>
        {toggle && (
          <CartModal
            direction="right"
            toggle={toggle}
            clickHandler={toggleHandler}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CartContainer;
