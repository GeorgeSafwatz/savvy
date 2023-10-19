import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type StatusProps = "successful" | "error";
const Toast: FC<{ title: string; status?: StatusProps }> = ({
  status,
  title,
}) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (status) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 7000);
    }
  }, [status]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={` bottom-3 fixed left-0 right-0 lg:left-[80%] lg:right-3 lg:translate-x-0 px-3 py-1 lg:px-6 lg:py-3 border-2 rounded-md w-3/4 lg:w-fit text-center capitalize z-10 mx-auto ${
            status === "successful"
              ? "bg-green-200 text-green-700 border-green-700"
              : status === "error"
              ? "bg-red-200 text-red-700 border-red-700"
              : "bg-slate-200 text-slate-700 border-slate-700"
          }`}
        >
          {title}
        </motion.p>
      )}
    </AnimatePresence>,
    document.getElementById("overlay")!
  );
};

export default Toast;
