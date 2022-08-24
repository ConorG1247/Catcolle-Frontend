import { useEffect } from "react";
import { useState } from "react";

type attack = {
  name: string;
  multiplier: number;
  cost: number;
  description: string;
};

type stats = {
  strength: number;
  defence: number;
  speed: number;
  regen: number;
  crit: number;
  charge: number;
  attacks: attack[];
};

function Healthbar() {
  const [playerHealth, setPlayerHealth] = useState({
    initial: 125,
    health: 125,
    percentage: 100,
  });
  const [enemyHealth, setEnemyHealth] = useState({
    initial: 135,
    health: 135,
    percentage: 100,
  });
  const [playerStats, setPlayerStats] = useState<stats>({
    strength: 15,
    defence: 9,
    speed: 1,
    regen: 10,
    crit: 1.6,
    charge: 0,
    attacks: [
      {
        name: "Slash",
        multiplier: 2,
        cost: 70,
        description: "attack",
      },
      {
        name: "Defense Drop",
        multiplier: 2,
        cost: 40,
        description: "reduce defence",
      },
    ],
  });
  const [enemyStats, setEnemyStats] = useState<stats>({
    strength: 15,
    defence: 10,
    speed: 1,
    regen: 10,
    crit: 0.6,
    charge: 0,
    attacks: [],
  });
  const [enemyAttackChecker, setEnemyAttackChecker] = useState(false);
  const [intervalId, setIntervalId] = useState<number | NodeJS.Timer>(0);
  const [playerAttackDelayCheck, setPlayerAttackDelayCheck] = useState(false);

  const stopEnemyAttacks = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  };

  // starts enemy attacks and sets interval for time based on enemies speed
  // clears interval if reset is called or player/enemy hp = 0
  useEffect(() => {
    const enemyAttacks = () => {
      let attackValue = enemyStats.strength - playerStats.defence * 0.2;
      const critChance = Math.floor(Math.random() * 100);

      if (enemyStats.crit > critChance) {
        attackValue = attackValue * 1.6;
      }

      const maxAttack = attackValue + attackValue * 0.15;
      const minAttack = attackValue - attackValue * 0.15;

      const randomAttack = Math.floor(
        Math.random() * (maxAttack - minAttack + 1) + minAttack
      );

      if (playerHealth.health - randomAttack <= 0) {
        setPlayerHealth({ ...playerHealth, health: 0, percentage: 0 });
        setEnemyAttackChecker(false);
        return;
      }
      setPlayerHealth({
        ...playerHealth,
        health: playerHealth.health - randomAttack,
        percentage:
          ((playerHealth.health - randomAttack) / playerHealth.initial) * 100,
      });
    };

    if (enemyAttackChecker) {
      setTimeout(enemyAttacks, 1000 / enemyStats.speed);
    }
  }, [
    enemyAttackChecker,
    enemyStats.strength,
    enemyStats.crit,
    enemyStats.speed,
    playerHealth,
    playerStats.defence,
  ]);

  // creates cooldown for player attack based on speed
  const playerAttackDelay = () => {
    const speedCheck = 1000 / playerStats.speed;
    setPlayerAttackDelayCheck(true);
    setTimeout(() => setPlayerAttackDelayCheck(false), speedCheck);
  };

  const playerCharge = () => {
    if (playerStats.charge >= 100) {
      setPlayerStats({
        ...playerStats,
        charge: 100,
      });
      return;
    }

    setPlayerStats({
      ...playerStats,
      charge: playerStats.charge + playerStats.regen,
    });
  };

  // basic player attack stats
  const playerAttack = () => {
    playerAttackDelay();
    let attackValue = playerStats.strength - enemyStats.defence * 0.2;
    const critChance = Math.floor(Math.random() * 100);

    if (playerStats.crit > critChance) {
      attackValue = attackValue * 1.6;
    }

    const maxAttack = attackValue + attackValue * 0.15;
    const minAttack = attackValue - attackValue * 0.15;

    const randomAttack = Math.floor(
      Math.random() * (maxAttack - minAttack + 1) + minAttack
    );

    playerCharge();

    if (enemyHealth.health - randomAttack <= 0) {
      setEnemyHealth({ ...enemyHealth, health: 0, percentage: 0 });
      setEnemyAttackChecker(false);
      return;
    }
    setEnemyHealth({
      ...enemyHealth,
      health: enemyHealth.health - randomAttack,
      percentage:
        ((enemyHealth.health - randomAttack) / enemyHealth.initial) * 100,
    });

    setEnemyAttackChecker(true);
  };

  const chargeAttack = (index: number) => {
    if (playerStats.attacks[index].cost <= playerStats.charge) {
      setPlayerStats({
        ...playerStats,
        charge: playerStats.charge - playerStats.attacks[index].cost,
      });
      if (playerStats.attacks[index].description === "reduce defence") {
        setEnemyStats({
          ...enemyStats,
          defence: enemyStats.defence * 0.8,
        });
      }
      if (playerStats.attacks[index].description === "attack") {
        let attackValue =
          playerStats.strength * playerStats.attacks[index].multiplier -
          enemyStats.defence * 0.2;
        setEnemyHealth({
          ...enemyHealth,
          health: enemyHealth.health - attackValue,
          percentage:
            ((enemyHealth.health - attackValue) / enemyHealth.initial) * 100,
        });
      }
    }
  };

  const reset = () => {
    setPlayerHealth({
      ...playerHealth,
      health: playerHealth.initial,
      percentage: 100,
    });
    setEnemyHealth({
      ...enemyHealth,
      health: enemyHealth.initial,
      percentage: 100,
    });
    setPlayerStats({
      ...playerStats,
      charge: 0,
    });
    setEnemyStats({
      ...enemyStats,
      charge: 0,
    });
    setEnemyAttackChecker(false);
    stopEnemyAttacks();
  };

  return (
    <div>
      <div className="healthbar">
        <div
          className="inner"
          style={{
            width: playerHealth.percentage * 2,
            backgroundColor:
              playerHealth.percentage > 75
                ? "#4DDF76"
                : playerHealth.percentage > 50
                ? "#DDDF4D"
                : playerHealth.percentage > 30
                ? "#DFB14D"
                : "#DF4D4D",
          }}
        />
      </div>
      <div className="charge">
        <div
          className="inner-charge"
          style={{ width: playerStats.charge * 1.5 }}
        />
      </div>
      <div>Player: {playerHealth.health}</div>
      <div className="healthbar">
        <div
          className="inner"
          style={{
            width: enemyHealth.percentage * 2,
            backgroundColor:
              enemyHealth.percentage > 75
                ? "#4DDF76"
                : enemyHealth.percentage > 50
                ? "#DDDF4D"
                : enemyHealth.percentage > 30
                ? "#DFB14D"
                : "#DF4D4D",
          }}
        />
      </div>
      <div className="charge">
        <div
          className="inner-charge"
          style={{ width: enemyStats.charge * 1.5 }}
        />
      </div>
      <div>Enemy: {enemyHealth.health}</div>
      <br />
      <button
        disabled={playerAttackDelayCheck}
        className={playerAttackDelayCheck ? "attack attack-disabled" : "attack"}
        onClick={playerAttack}
      >
        Attack
      </button>
      {playerStats.attacks.map((attacks, index) => {
        return (
          <div key={index}>
            <button onClick={() => chargeAttack(index)} className="attack">
              {attacks.name}
            </button>
          </div>
        );
      })}
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Healthbar;
