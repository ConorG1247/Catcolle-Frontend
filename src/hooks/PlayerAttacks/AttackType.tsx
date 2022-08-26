import { attacks, enemyStats, playerStats } from "libs/types";
import Slash from "./Slash";

function AttackType(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void
) {
  switch (attack.name) {
    case "Slash":
      Slash(
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
}

export default AttackType;
