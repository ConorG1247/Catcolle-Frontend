import { attacks, enemyStats, playerStats } from "libs/types";

function Slice(
  playerStats: playerStats,
  attack: attacks,
  enemyStats: enemyStats,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  let attackDamage = Math.floor(
    playerStats.level * 1 +
      playerStats.stats.dexterity * 0.4 * attack.multiplier -
      enemyStats.stats.defence * 0.2
  );

  const critChance = playerStats.crit + playerStats.stats.chance * 0.4;

  if (critChance >= Math.floor(Math.random() * 100)) {
    attackDamage = Math.floor(
      attackDamage * playerStats.cdmg + playerStats.stats.chance * 0.2
    );
  }

  changeDamageNumber(attackDamage);

  if (enemyStats.health.health - attackDamage <= 0) {
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
      health: enemyStats.health.health - attackDamage,
      percentage:
        ((enemyStats.health.health - attackDamage) /
          enemyStats.health.initial) *
        100,
    },
  });
  return;
}

export default Slice;
