import { attacks, playerStats } from "libs/types";

function DexterityUp(
  playerStats: playerStats,
  attack: attacks,
  playerStatsChangeGlobal: (changes: playerStats) => void
) {
  setTimeout(() => {
    playerStatsChangeGlobal({
      ...playerStats,
      stats: {
        ...playerStats.stats,
        dexterity: playerStats.initialStats.dexterity,
      },
    });
  }, attack.multiplier);
  playerStatsChangeGlobal({
    ...playerStats,
    stats: {
      ...playerStats.stats,
      dexterity: playerStats.initialStats.dexterity * 1.5,
    },
  });
}

export default DexterityUp;
