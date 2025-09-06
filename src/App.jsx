import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";
import MovingCard from "./components/MovingCard";

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
  }, [sirPower]);

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
    <div className="bg-black min-h-screen font-gwent ">
      <section className="bg-red-900 rounded-b-3xl mb-4 flex items-center justify-between px-12">
        <h1 className="text-4xl text-center font-bold text-white p-4">
          Gwent: Moshcraft Experience.exe
        </h1>
        <h2 className="text-2xl text-center font-semibold text-white p-4">
          Moshed Points: {totalPower}
        </h2>
      </section>
      <section className="flex gap-[0.2rem] p-14 flex-wrap justify-left relative">
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
    </div>
  );
}

export default App;
