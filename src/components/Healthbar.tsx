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
  intelligence: number;
  crit: number;
  charge: number;
  attacks: attack[];
};

type enemyAttack = {
  name: string;
  multiplier: number;
  cost: number;
  description: string;
  chance: number;
};

type enemyStats = {
  strength: number;
  defence: number;
  speed: number;
  intelligence: number;
  crit: number;
  charge: number;
  attacks: enemyAttack[];
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
    intelligence: 25,
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
  const [enemyStats, setEnemyStats] = useState<enemyStats>({
    strength: 15,
    defence: 10,
    speed: 1,
    intelligence: 53,
    crit: 0.6,
    charge: 0,
    attacks: [
      {
        name: "Mega Slash",
        multiplier: 2,
        cost: 70,
        description: "heavy attack",
        chance: 3,
      },
      {
        name: "Slash",
        multiplier: 1.3,
        cost: 70,
        description: "attack",
        chance: 7,
      },
    ],
  });
  const [enemyAttackChecker, setEnemyAttackChecker] = useState(false);
  const [playerAttackDelayCheck, setPlayerAttackDelayCheck] = useState(false);

  const startGame = () => {
    enemyAttacks();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const enemyAttacks = () => {
    setEnemyAttackChecker(false);
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

    enemyCharge();
    enemyChargeAttack();

    setTimeout(enemyAttacks, 1000);
  };

  const enemyCharge = () => {
    if (enemyStats.charge + enemyStats.intelligence * 0.5 >= 100) {
      setEnemyStats({
        ...enemyStats,
        charge: 100,
      });
      return;
    }

    setEnemyStats({
      ...enemyStats,
      charge: enemyStats.charge + enemyStats.intelligence * 0.5,
    });
  };

  const enemyChargeAttack = () => {
    const randomAttack = Math.floor(Math.random() * 10);

    if (
      enemyStats.charge + enemyStats.intelligence * 0.5 >=
      enemyStats.attacks[0].cost
    ) {
      if (enemyStats.attacks[0].chance >= randomAttack) {
        return enemyAttackType(enemyStats.attacks[0].description);
      }
      return enemyAttackType(enemyStats.attacks[1].description);
    }
  };

  const enemyAttackMultipliers = (multiplier: number) => {
    let attackValue =
      enemyStats.strength * multiplier - playerStats.defence * 0.2;

    if (playerHealth.health - attackValue <= 0) {
      setPlayerHealth({
        ...playerHealth,
        health: 0,
        percentage: 0,
      });
      return;
    }
    setPlayerHealth({
      ...playerHealth,
      health: Math.floor(playerHealth.health - attackValue),
      percentage:
        ((playerHealth.health - attackValue) / playerHealth.initial) * 100,
    });
    if (enemyStats.charge - enemyStats.attacks[0].cost <= 0) {
      setEnemyStats({
        ...enemyStats,
        charge: 0,
      });
      return;
    }
    setEnemyStats({
      ...enemyStats,
      charge: enemyStats.charge - enemyStats.attacks[0].cost,
    });
  };

  const enemyAttackType = (type: string) => {
    switch (type) {
      case "heavy attack":
        enemyAttackMultipliers(enemyStats.attacks[0].multiplier);
        break;
      default:
        enemyAttackMultipliers(enemyStats.attacks[1].multiplier);
    }
  };

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
      charge: playerStats.charge + playerStats.intelligence * 0.5,
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

    if (!enemyAttackChecker) {
      setEnemyAttackChecker(true);
    }
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

        if (enemyHealth.health - attackValue <= 0) {
          setEnemyHealth({
            ...enemyHealth,
            health: 0,
            percentage: 0,
          });
          return;
        }
        setEnemyHealth({
          ...enemyHealth,
          health: Math.floor(enemyHealth.health - attackValue),
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
      <div>Charge: {playerStats.charge}</div>
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
      <div>Charge: {enemyStats.charge}</div>
      <div>Enemy: {enemyHealth.health}</div>
      <br />
      <button onClick={startGame} className="reset">
        Start
      </button>
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
