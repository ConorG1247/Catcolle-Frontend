import { useState, useEffect } from "react";
import PlayerHealth from "./PlayerHealth";
import { attacks, enemyStats, playerStats } from "libs/types";
import EnemyBasic from "hooks/EnemyAttacks/EnemyBasic";
import EnemyAttackType from "hooks/EnemyAttacks/EnemyAttackType";

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
  const [damageNumberDisplay, setDamageNumberDisplay] = useState<number>();

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
    setDamageNumberDisplay(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  useEffect(() => {
    const charge = Math.floor(
      enemyCharge +
        enemyStats.level * 0.2 +
        enemyStats.stats.intelligence * 0.3 +
        7 +
        Math.random() * 6
    );

    const basicAttack = () => {
      const dodgeChance = Math.floor(playerStats.stats.agility * 0.1 + 5);

      if (dodgeChance >= Math.floor(Math.random() * 100)) {
        setTimeout(basicAttack, 1000 - enemyStats.stats.dexterity * 3);
        return;
      }

      if (battleCheck) {
        if (charge > enemyStats.attacks[0].cost) {
          enemyChargedAttack(enemyStats.attacks[0]);
          setEnemyCharge(charge - enemyStats.attacks[0].cost);
          return;
        } else {
          setEnemyCharge(charge);
          EnemyBasic(
            playerStats,
            enemyStats,
            changePlayerHealth,
            changeBattleCheck,
            changeDamageNumber
          );
        }
      }
    };
    setTimeout(basicAttack, 1000 - enemyStats.stats.dexterity * 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleCheck, playerStats]);

  function enemyChargedAttack(attack: attacks) {
    EnemyAttackType(
      playerStats,
      enemyStats,
      attack,
      changePlayerHealth,
      changeBattleCheck,
      changeDamageNumber
    );
  }

  function changePlayerHealth(changes: playerStats) {
    setPlayerStats(changes);
  }

  function changeDamageNumber(changes: number) {
    setDamageNumberDisplay(-Math.abs(changes));
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <PlayerHealth health={playerStats.health} />
        <div>{damageNumberDisplay}</div>
      </div>
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
