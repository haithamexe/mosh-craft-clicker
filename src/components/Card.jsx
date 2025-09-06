import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const Card = ({ power, img, isPicked }) => {
  const [showPlusOne, setShowPlusOne] = useState(false);
  useEffect(() => {
    if (power > 4 && img.split("/").pop() === "koshy.jpg") {
      setShowPlusOne(true);
      const timer = setTimeout(() => {
        setShowPlusOne(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    if (power > 2 && img.split("/").pop() === "endrega.jpg") {
      setShowPlusOne(true);
      const timer = setTimeout(() => {
        setShowPlusOne(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [power]);

  return (
    <div
      className={
        "w-60 cursor-pointer rounded-md  relative " +
        (isPicked ? " ml-[15.2rem]" : "")
      }
    >
      <AnimatePresence>
        {showPlusOne && (
          <motion.h1
            className="absolute z-20 text-green-400 text-[10rem] top-13 left-5"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 0.8, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            +1
          </motion.h1>
        )}
      </AnimatePresence>
      <h1
        className={
          `absolute  z-20 ` +
          (img.split("/").pop() === "endrega.jpg"
            ? power > 2
              ? " text-green-400"
              : " text-gray-200"
            : img.split("/").pop() === "koshy.jpg" && power > 4
            ? " text-green-400"
            : " text-gray-200") +
          (power >= 10
            ? " left-[1.3rem] text-[2.7rem] top-[0.68rem] "
            : " left-[1.6rem] text-[3.2rem] top-[0.3rem] ")
        }
      >
        {power}
      </h1>
      <img
        src="./images/numSquare.png"
        alt="sword"
        className="absolute w-18 h-auto top-[0.4rem] left-[0.15rem] z-2"
      />
      <img src={img} alt="Card image" className="object-contain" />
    </div>
  );
};

export default Card;
