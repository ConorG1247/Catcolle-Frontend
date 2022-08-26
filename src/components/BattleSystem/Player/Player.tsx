import { useState, useEffect } from "react";
import PlayerHealth from "./PlayerHealth";
import { enemyStats, playerStats } from "../../../libs/types";
import EnemyBasic from "hooks/Attacks/EnemyBasic";

type props = {
  pStats: playerStats;
  eStats: enemyStats;
  reset: boolean;
  changeBattleCheck: () => void;
  battleCheck: boolean;
  playerCharge: number;
};

function Player({
  pStats,
  eStats,
  reset,
  changeBattleCheck,
  battleCheck,
  playerCharge,
}: props) {
  const [playerStats, setPlayerStats] = useState(pStats);
  const [enemyStats, setEnemyStats] = useState(eStats);
  const [enemyCharge, setEnemyCharge] = useState(0);

  useEffect(() => {
    const basicAttack = () => {
      if (battleCheck) {
        setEnemyCharge(
          Math.floor(
            enemyCharge +
              enemyStats.level * 0.2 +
              enemyStats.stats.intelligence * 0.3 +
              7 +
              Math.random() * 6
          )
        );
        const changePlayerHealth = (changes: playerStats) => {
          setPlayerStats(changes);
        };
        EnemyBasic(
          playerStats,
          enemyStats,
          changePlayerHealth,
          changeBattleCheck
        );
      }
    };
    setTimeout(basicAttack, 1000 - enemyStats.stats.dexterity * 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleCheck, playerStats]);

  useEffect(() => {
    setPlayerStats({
      ...playerStats,
      health: {
        ...playerStats.health,
        health: playerStats.health.initial,
        percentage: 100,
      },
    });
    setEnemyCharge(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <div>
      <PlayerHealth health={playerStats.health} />
      <div
        className="charge"
        style={{ width: playerStats.stats.intelligence * 1.5 + 100 }}
      >
        <div className="inner-charge" style={{ width: playerCharge }} />
      </div>
      <div>Charge: {playerCharge}</div>
      <div>Player: {playerStats.health.health}</div>
    </div>
  );
}

export default Player;
