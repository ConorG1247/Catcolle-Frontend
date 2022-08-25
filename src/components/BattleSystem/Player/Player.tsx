import { useState, useEffect } from "react";
import PlayerHealth from "./PlayerHealth";
import { enemyStats, playerStats } from "../../../libs/types";

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
  const [playerStats, setPlayerStats] = useState<props["pStats"]>(pStats);
  const [enemyStats, setEnemyStats] = useState<props["eStats"]>(eStats);

  useEffect(() => {
    const basicAttack = () => {
      if (battleCheck) {
        let attackDamage = Math.floor(
          (enemyStats.level * 4) / 2 +
            ((enemyStats.stats.strength * 0.4 +
              enemyStats.stats.agility * 0.3 +
              enemyStats.stats.intelligence * 0.3 +
              enemyStats.stats.dexterity * 0.7) /
              2 -
              enemyStats.stats.defence * 0.4)
        );

        const critChance = enemyStats.stats.chance * 0.4;

        if (critChance >= Math.floor(Math.random() * 100)) {
          attackDamage = attackDamage * 1.6 + enemyStats.stats.chance * 0.2;
        }

        const maxAttack = attackDamage + attackDamage * 0.15;
        const minAttack = attackDamage - attackDamage * 0.15;

        const damageVariance = Math.floor(
          Math.random() * (maxAttack - minAttack + 1) + minAttack
        );

        if (playerStats.health.health - damageVariance <= 0) {
          setPlayerStats({
            ...playerStats,
            health: {
              ...playerStats.health,
              health: 0,
              percentage: 0,
            },
          });
          changeBattleCheck();
          return;
        }

        setPlayerStats({
          ...playerStats,
          health: {
            ...playerStats.health,
            health: playerStats.health.health - damageVariance,
            percentage:
              ((playerStats.health.health - damageVariance) /
                playerStats.health.initial) *
              100,
          },
        });
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
