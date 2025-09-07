import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";
import MovingCard from "./components/MovingCard";
import { FaTwitch } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

function App() {
  const [sirPower, setSirPower] = useState(4);
  const [koshPower, setKoshPower] = useState(4);
  const [endregas, setEndregas] = useState([
    { id: crypto.randomUUID(), power: 2, img: "./images/endrega.jpg" },
  ]);
  const [totalPower, setTotalPower] = useState(8);
  const endregaImg = "./images/endrega.jpg";
  const koshImg = "./images/koshy.jpg";
  const sirImg = "./images/sir.jpg";
  const [isPicked, setIsPicked] = useState(false);

  const increaseSirPower = () => {
    setSirPower((prev) => prev + 2);
  };

  const addEndrega = () => {
    const newEndrega = { id: crypto.randomUUID(), power: 2, img: endregaImg };
    setEndregas((prev) => [...prev, newEndrega]);
  };

  const increaseEndregasPower = () => {
    const updatedEndregas = endregas.map((endrega) => {
      endrega.power += 1;
      return endrega;
    });
    setEndregas(updatedEndregas);
  };

  const increaseKoshPower = () => {
    setKoshPower((prev) => prev + 1);
  };

  useEffect(() => {
    calculateTotalPower();
  }, [sirPower, koshPower, endregas]);

  const calculateTotalPower = () => {
    let endregasPower = 0;
    endregas.forEach((endrega) => {
      endregasPower += endrega.power;
    });
    setTotalPower(sirPower + koshPower + endregasPower);
  };

  const handleCardClick = () => {
    increaseSirPower();
    increaseKoshPower();
    increaseEndregasPower();
  };

  useEffect(() => {
    if (koshPower > 4) addEndrega();
  }, [koshPower]);

  return (
    <div className="font-gwent ">
      <section className="bg-body rounded-b-4xl mb-4 flex items-center justify-between px-12 fixed top-0 left-0 w-full z-50 border-b-4 border-red-900">
        <div className="flex items-center gap-4 py-4 cursor-pointer">
          <img
            src="./images/mosh.png"
            alt="mosh logo"
            className="w-15 h-auto object-contain "
          />
          {/* <h1 className="text-4xl text-center font-bold text-white p-4">
            Gwent: Moshcraft Experience.exe
          </h1> */}
          <img
            src="./images/gwetext.png"
            alt="mosh logo"
            className="w-150 h-auto object-contain"
          />
        </div>
        <h2 className="text-2xl text-center font-semibold text-white p-4">
          Moshed Points: {totalPower}
        </h2>
      </section>
      <section className="flex gap-[0.2rem] p-14 flex-wrap justify-left relative mt-20">
        <MovingCard
          power={sirPower}
          img={sirImg}
          handleCardClick={handleCardClick}
          setIsPicked={setIsPicked}
          isPicked={isPicked}
        />
        <Card power={koshPower} img={koshImg} isPicked={isPicked} />
        {endregas.map((endrega) => (
          <Card key={endrega.id} power={endrega.power} img={endrega.img} />
        ))}
      </section>
      <img
        src="./images/back.jpg"
        alt="mosh logo"
        className="w-full h-full object-cover fixed top-2 left-0 -z-10 "
      />
      <section className="fixed bottom-4 right-4 flex gap-5 text-4xl bg-black px-4 py-2 rounded-full ">
        <a
          href="https://discord.com/invite/5r4W94HKWT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className="text-purple-500 hover:text-purple-400 cursor-pointer transition-all" />
        </a>
        <a
          href="https://www.twitch.tv/moshcraft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitch className="text-purple-500 hover:text-purple-400 cursor-pointer transition-all" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC63UktC9K6ACRv5z1fPcSmg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="text-red-700 hover:text-red-400 cursor-pointer transition-all" />
        </a>
      </section>
    </div>
  );
}

export default App;
