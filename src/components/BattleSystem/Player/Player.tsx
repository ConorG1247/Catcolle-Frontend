import { useState, useEffect } from "react";
import PlayerHealth from "./PlayerHealth";
import { playerStats } from "../../../libs/types";

type props = {
  playerStats: playerStats;
  startBattle: boolean;
};

function Player({ playerStats, startBattle }: props) {
  const [stats, setStats] = useState<props["playerStats"]>(playerStats);

  useEffect(() => {
    const damage = () => {
      setStats({
        ...stats,
        health: {
          ...stats.health,
          health: stats.health.health - 10,
          percentage: stats.health.percentage - 10,
        },
      });
    };

    if (startBattle) {
      const interval = setInterval(() => damage(), 1000);

      return () => clearInterval(interval);
    }
  }, [startBattle, stats]);

  return (
    <div>
      <PlayerHealth health={stats.health} />
      <div>Player: {stats.health.health}</div>
    </div>
  );
}

export default Player;
