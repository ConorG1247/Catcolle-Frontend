import { useState } from "react";
import EnemyHealth from "./Enemy";
import PlayerHealth from "./Player/Player";
import { playerStats, enemyStats } from "../../libs/types";

function Battle() {
  const [playerStats, setPlayerStats] = useState<playerStats>({
    level: 5,
    health: {
      initial: 125,
      health: 125,
      percentage: 100,
    },
    stats: {
      endurance: 25,
      strength: 10,
      intelligence: 10,
      defence: 10,
      dexterity: 10,
      agility: 10,
    },
    attacks: [
      {
        name: "Slash",
        cost: 70,
        multiplier: 1.6,
        type: "attack",
        effect: "light attack",
        description: "A quick slashing move which does medium damage.",
      },
    ],
  });

  const [enemyStats, setEnemyStats] = useState<enemyStats>({
    level: 7,
    health: {
      initial: 135,
      health: 135,
      percentage: 100,
    },
    stats: {
      strength: 1,
      intelligence: 1,
      defence: 1,
      dexterity: 1,
      agility: 1,
    },
    attacks: [
      {
        name: "Slash",
        cost: 70,
        multiplier: 1.6,
        type: "attack",
        effect: "light attack",
        description: "A quick slashing move which does medium damage.",
      },
    ],
  });
  const [startBattle, setStartBattle] = useState(false);

  return (
    <div>
      <PlayerHealth playerStats={playerStats} startBattle={startBattle} />
      <EnemyHealth enemyStats={enemyStats} />
      <button onClick={() => setStartBattle(true)}>Start</button>
    </div>
  );
}

export default Battle;
