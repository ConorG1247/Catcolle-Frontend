import { attacks, enemyStats, playerStats } from "libs/types";

function Slash(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void,
  playerStatsChangeGlobal: (changes: playerStats) => void
) {
  const damage = Math.floor(
    playerStats.level * 5 +
      playerStats.stats.strength * 0.8 * attack.multiplier -
      enemyStats.stats.defence * 0.2
  );

  changeDamageNumber(damage);

  setTimeout(() => {
    playerStatsChangeGlobal({
      ...playerStats,
      stats: {
        ...playerStats.stats,
        strength: playerStats.initialStats.strength,
      },
    });
  }, 5000);
  playerStatsChangeGlobal({
    ...playerStats,
    stats: {
      ...playerStats.stats,
      strength: playerStats.stats.strength * 1.5,
    },
  });

  if (enemyStats.health.health - damage <= 0) {
    changeEnemyHealth({
      ...enemyStats,
      health: {
        ...enemyStats.health,
        health: 0,
        percentage: 0,
      },
    });
    changeBattleCheck();
    return;
  }

  changeEnemyHealth({
    ...enemyStats,
    health: {
      ...enemyStats.health,
      health: enemyStats.health.health - damage,
      percentage:
        ((enemyStats.health.health - damage) / enemyStats.health.initial) * 100,
    },
  });
  return;
}

export default Slash;
