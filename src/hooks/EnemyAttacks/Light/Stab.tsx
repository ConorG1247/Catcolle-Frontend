import { attacks, enemyStats, playerStats } from "libs/types";

function Stab(
  playerStats: playerStats,
  enemyStats: enemyStats,
  attack: attacks,
  changePlayerHealth: (changes: playerStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  const damage = Math.floor(
    enemyStats.level * 2 +
      enemyStats.stats.strength * attack.multiplier -
      playerStats.stats.defence * 0.2
  );

  changeDamageNumber(damage);

  if (playerStats.health.health - damage <= 0) {
    changePlayerHealth({
      ...playerStats,
      health: {
        ...playerStats.health,
        health: 0,
        percentage: 0,
      },
    });
    changeBattleCheck();
    return;
  }

  changePlayerHealth({
    ...playerStats,
    health: {
      ...playerStats.health,
      health: playerStats.health.health - damage,
      percentage:
        ((playerStats.health.health - damage) / playerStats.health.initial) *
        100,
    },
  });
  return;
}

export default Stab;
