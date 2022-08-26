import { attacks, enemyStats, playerStats } from "libs/types";
import { useState, useEffect } from "react";
import EnemyHealth from "./EnemyHealth";
import PlayerBasic from "hooks/PlayerAttacks/PlayerBasic";
import AttackType from "hooks/PlayerAttacks/AttackType";

type props = {
  pStats: playerStats;
  eStats: enemyStats;
  reset: boolean;
  battleCheck: boolean;
  changeBattleCheck: () => void;
  addCharge: () => void;
  playerCharge: number;
  removeCharge: (cost: number) => void;
};

function Enemy({
  pStats,
  eStats,
  reset,
  battleCheck,
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

    switch (attack.type) {
      case "attack":
        AttackType(
          playerStats,
          attack,
          enemyStats,
          changeEnemyHealth,
          changeBattleCheck
        );
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <EnemyHealth health={enemyStats.health} />
      <div>Enemy: {enemyStats.health.health}</div>
      <button
        disabled={battleCheck ? (attackDelayCheck ? true : false) : false}
        className="attack"
        onClick={basicAttack}
      >
        Attack
      </button>
      <div style={{ display: "flex" }}>
        {playerStats.attacks.map((attacks, index) => {
          return (
            <div key={index}>
              <button
                disabled={
                  battleCheck
                    ? playerCharge > attacks.cost
                      ? false
                      : true
                    : true
                }
                onClick={() => chargedAttack(attacks)}
                className="attack"
              >
                {attacks.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Enemy;
