import { attacks, enemyStats, playerStats } from "libs/types";
import Slash from "./Light/Slash";

function AttackType(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  switch (attack.name) {
    case "Slash":
      Slash(
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
}

export default AttackType;
