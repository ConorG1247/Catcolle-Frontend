import Battle from "components/BattleSystem/Battle";
import ClickTest from "components/ClickTest";
import IntervalTest from "components/IntervalTest";
import { useEffect, useState } from "react";
import "./App.css";
import Healthbar from "./components/Healthbar";

function App() {
  // const [health, setHealth] = useState(100);
  // const [dead, setDead] = useState(false);

  // const damage = () => {
  //   setHealth(health - 10);
  // };

  // const death = () => {
  //   setDead(true);
  // };

  // useEffect(() => {
  //   console.log(true);
  // }, [dead]);

  return (
    <div>
      {/* <div>{health}</div>
      <ClickTest dead={death} />
      <IntervalTest damage={damage} /> */}
      <Battle />
    </div>
  );
}

export default App;
