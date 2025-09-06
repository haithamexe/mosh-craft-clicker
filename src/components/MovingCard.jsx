import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { useState, useEffect, useRef } from "react";

const MovingCard = ({
  power: sirPower,
  img,
  handleCardClick,
  setIsPicked,
  isPicked,
}) => {
  const [following, setFollowing] = useState(false);
  const [x, setX] = useState(document.clientX);
  const [y, setY] = useState(document.clientY);
  const clickRef = useState(0);

  const [paddings, setPaddings] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const card = document.getElementById("moving-card");
    const rect = card.getBoundingClientRect();
    setPaddings({
      x: rect.width / 2,
      y: rect.height / 2,
    });
  }, []);

  // adjust x/y to center of card
  useEffect(() => {
    setX((prev) => prev + paddings.x);
    setY((prev) => prev + paddings.y);
  }, [paddings]);

  // motion values for x/y

  // smooth skew
  const skewX = useSpring(0, { stiffness: 200, damping: 20 });
  const skewY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!following) {
      skewX.set(0);
      skewY.set(0);

      setX(e.clientX);
      setY(e.clientY);
      return;
    }

    setX(e.clientX);
    setY(e.clientY);

    // skew opposite direction
    skewX.set(-(e.movementX * 0.5));
    skewY.set(-(e.movementY * 0.5));
  };

  useEffect(() => {
    if (!following && clickRef[0] > 0) {
      handleCardClick();
    }
  }, [following]);

  const power = isPicked ? 4 : sirPower;

  const [showPlusOne, setShowPlusOne] = useState(false);
  useEffect(() => {
    if (power > 4) {
      setShowPlusOne(true);
      const timer = setTimeout(() => {
        setShowPlusOne(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [power]);

  return (
    <motion.div
      onTap={() => {
        clickRef[1](clickRef[0] + 1);
        setIsPicked((prev) => !prev);
        setFollowing((prev) => !prev);
      }}
      onMouseMove={handleMove}
      style={{
        position: following ? "fixed" : "relative",
        left: following ? x - paddings.x : "auto",
        top: following ? y - paddings.y : "auto",
        skewX: following ? skewX : 0,
        skewY: following ? skewY : 0,
        cursor: "pointer",
        zIndex: following ? 50 : 10,
        scale: following ? 1.6 : 1,
        transform: "translate(-50%, -50%)", // keeps centered
      }}
      className="w-60 rounded-md relative cursor-pointer z-10 "
      id="moving-card"
    >
      {/* Power value */}

      <AnimatePresence>
        {showPlusOne && (
          <motion.h1
            className="absolute z-20 text-green-400 text-[10rem] top-13 left-5 select-none"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 0.8, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            +2
          </motion.h1>
        )}
      </AnimatePresence>

      <h1
        className={`absolute z-20 ${
          img.includes("endrega.jpg")
            ? power > 2
              ? "text-green-400"
              : "text-gray-200"
            : img.includes("koshy.jpg")
            ? power > 4
              ? "text-green-400"
              : "text-gray-200"
            : img.includes("sir.jpg")
            ? power > 4
              ? "text-green-400"
              : "text-gray-200"
            : ""
        } ${
          power >= 10
            ? " left-[1.3rem] text-[2.7rem] top-[0.68rem] "
            : " left-[1.6rem] text-[3.2rem] top-[0.3rem] "
        }`}
      >
        {isPicked ? 4 : power}
      </h1>

      {/* Frame number background */}
      <img
        src="./images/numSquare.png"
        alt="sword"
        className="absolute w-18 h-auto top-[0.4rem] left-[0.15rem] z-2"
      />

      {/* Main image */}
      <img src={img} alt="Card image" className="object-contain" />
    </motion.div>
  );
};

export default MovingCard;
