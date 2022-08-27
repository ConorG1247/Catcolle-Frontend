import { attacks, playerStats } from "libs/types";
import DexterityUp from "./DexterityUp";

function AttackType(
  playerStats: playerStats,
  attack: attacks,
  playerStatsChangeGlobal: (changes: playerStats) => void
) {
  switch (attack.name) {
    case "Dexterity Up":
      DexterityUp(playerStats, attack, playerStatsChangeGlobal);
      break;
    default:
      return;
  }
}

export default AttackType;
