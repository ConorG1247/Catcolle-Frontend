import { attacks, enemyStats, playerStats } from "libs/types";
import Slash from "./Light/Slash";
import Slice from "./Light/Slice";

function AttackType(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void,
  playerStatsChangeGlobal: (changes: playerStats) => void
) {
  switch (attack.name) {
    case "Slash":
      Slash(
        playerStats,
        attack,
        enemyStats,
        changeEnemyHealth,
        changeBattleCheck,
        changeDamageNumber,
        playerStatsChangeGlobal
      );
      break;
    case "Slice":
      Slice(
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
