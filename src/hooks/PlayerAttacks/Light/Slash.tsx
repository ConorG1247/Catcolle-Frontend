import { attacks, enemyStats, playerStats } from "libs/types";

function Slash(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  const damage =
    playerStats.level * 5 + playerStats.stats.strength * attack.multiplier;

  changeDamageNumber(damage);

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
