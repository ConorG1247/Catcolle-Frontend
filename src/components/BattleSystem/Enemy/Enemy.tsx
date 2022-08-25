import { attacks, enemyStats, playerStats } from "libs/types";
import { useState, useEffect } from "react";
import EnemyHealth from "./EnemyHealth";
import Slash from "hooks/Attacks/Slash";
import PlayerBasic from "hooks/Attacks/PlayerBasic";

type props = {
  pStats: playerStats;
  eStats: enemyStats;
  reset: boolean;
  changeBattleCheck: () => void;
  addCharge: () => void;
  playerCharge: number;
  removeCharge: (cost: number) => void;
};

function Enemy({
  pStats,
  eStats,
  reset,
  changeBattleCheck,
  addCharge,
  playerCharge,
  removeCharge,
}: props) {
  const [playerStats, setPlayerStats] = useState(pStats);
  const [enemyStats, setEnemyStats] = useState(eStats);
  const [attackDelayCheck, setAttackDelayCheck] = useState(false);

  useEffect(() => {
    setEnemyStats({
      ...enemyStats,
      health: {
        ...enemyStats.health,
        health: enemyStats.health.initial,
        percentage: 100,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const playerAttackDelay = () => {
    setAttackDelayCheck(true);
    setTimeout(
      () => setAttackDelayCheck(false),
      1000 - playerStats.stats.dexterity * 3
    );
  };

  const basicAttack = () => {
    playerAttackDelay();
    const changeEnemyHealth = (changes: enemyStats) => {
      setEnemyStats(changes);
    };
    PlayerBasic(
      playerStats,
      enemyStats,
      addCharge,
      changeEnemyHealth,
      changeBattleCheck
    );
  };

  const chargedAttack = (attack: attacks) => {
    if (attack.cost > playerCharge) {
      return;
    }
    removeCharge(attack.cost);

    const changeEnemyHealth = (changes: enemyStats) => {
      setEnemyStats(changes);
    };
    Slash(
      playerStats,
      attack,
      enemyStats,
      changeEnemyHealth,
      changeBattleCheck
    );
  };

  return (
    <div>
      <EnemyHealth health={enemyStats.health} />
      <div>Enemy: {enemyStats.health.health}</div>
      <button
        disabled={attackDelayCheck}
        className={attackDelayCheck ? "attack attack-disabled" : "attack"}
        onClick={basicAttack}
      >
        Attack
      </button>
      {playerStats.attacks.map((attacks, index) => {
        return (
          <div key={index}>
            <button onClick={() => chargedAttack(attacks)} className="attack">
              {attacks.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Enemy;
