import { attacks, enemyStats, playerStats } from "libs/types";
import Stab from "./Light/Stab";

function EnemyAttackType(
  playerStats: playerStats,
  enemyStats: enemyStats,
  attack: attacks,
  changePlayerHealth: (changes: playerStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  switch (attack.name) {
    case "Stab":
      Stab(
        playerStats,
        enemyStats,
        attack,
        changePlayerHealth,
        changeBattleCheck,
        changeDamageNumber
      );
      break;
    default:
      return;
  }
}

export default EnemyAttackType;
