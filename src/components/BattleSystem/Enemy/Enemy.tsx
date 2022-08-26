import { attacks, enemyStats, playerStats } from "libs/types";
import { useState, useEffect } from "react";
import EnemyHealth from "./EnemyHealth";
import PlayerBasic from "hooks/PlayerAttacks/PlayerBasic";
import AttackType from "hooks/PlayerAttacks/AttackType";
import ChargeAttacks from "./ChargeAttacks";

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
  const [damageNumberDisplay, setDamageNumberDisplay] = useState<
    (string | number)[]
  >([]);

  useEffect(() => {
    setEnemyStats({
      ...enemyStats,
      health: {
        ...enemyStats.health,
        health: enemyStats.health.initial,
        percentage: 100,
      },
    });
    setDamageNumberDisplay([]);
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
    const dodgeChance = Math.floor(enemyStats.stats.agility * 0.1 + 5);

    if (dodgeChance >= Math.floor(Math.random() * 100)) {
      setDamageNumberDisplay([...damageNumberDisplay, "Miss"]);
      return;
    }

    PlayerBasic(
      playerStats,
      enemyStats,
      addCharge,
      changeEnemyHealth,
      changeBattleCheck,
      changeDamageNumber
    );
  };

  const chargedAttack = (attack: attacks) => {
    if (attack.cost > playerCharge) {
      return;
    }
    removeCharge(attack.cost);

    switch (attack.type) {
      case "attack":
        AttackType(
          playerStats,
          attack,
          enemyStats,
          changeEnemyHealth,
          changeBattleCheck,
          changeDamageNumber
        );
        break;
      default:
        return;
    }
  };

  function changeEnemyHealth(changes: enemyStats) {
    setEnemyStats(changes);
  }

  function changeDamageNumber(changes: number) {
    setDamageNumberDisplay([...damageNumberDisplay, -Math.abs(changes)]);
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <EnemyHealth health={enemyStats.health} />
        {damageNumberDisplay.map((dmg, index) => {
          return (
            <div key={index}>
              <div
                className={damageNumberDisplay ? "damage-display-fade" : ""}
                style={{ padding: 5 }}
              >
                {dmg}
              </div>
              <div className={damageNumberDisplay ? "" : ""}></div>
            </div>
          );
        })}
      </div>
      <div>Enemy: {enemyStats.health.health}</div>
      <button
        disabled={battleCheck ? (attackDelayCheck ? true : false) : false}
        className="attack"
        onClick={basicAttack}
      >
        Attack
      </button>
      <ChargeAttacks
        playerStats={playerStats}
        battleCheck={battleCheck}
        playerCharge={playerCharge}
        chargedAttack={chargedAttack}
      />
      <div className="slash"></div>
    </div>
  );
}

export default Enemy;
