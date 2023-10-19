import { useState } from "react";
import { MenubarIcon } from "../../assets/icons/icons";
import Button from "../General-UI/Button";
import Modal from "../MainNavigation/MenuSidebar";
import { AnimatePresence } from "framer-motion";

const Menu = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <section className="block md:hidden">
      <Button clickHandler={toggleHandler}>
        <MenubarIcon />
      </Button>
      <AnimatePresence>
        {toggle && (
          <Modal
            direction="left"
            toggle={toggle}
            clickHandler={toggleHandler}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Menu;
