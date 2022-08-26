import { enemyStats, playerStats } from "libs/types";

function EnemyBasic(
  playerStats: playerStats,
  enemyStats: enemyStats,
  changePlayerHealth: (changes: playerStats) => void,
  changeBattleCheck: () => void,
  changeDamageNumber: (changes: number) => void
) {
  let attackDamage = Math.floor(
    (enemyStats.level * 3) / 2 +
      ((enemyStats.stats.strength * 0.4 +
        enemyStats.stats.agility * 0.3 +
        enemyStats.stats.intelligence * 0.3 +
        enemyStats.stats.dexterity * 0.7) /
        2 -
        playerStats.stats.defence * 0.4)
  );

  const critChance = enemyStats.stats.chance * 0.4;

  if (critChance >= Math.floor(Math.random() * 100)) {
    attackDamage = attackDamage * 1.6 + enemyStats.stats.chance * 0.2;
  }

  const maxAttack = attackDamage + attackDamage * 0.15;
  const minAttack = attackDamage - attackDamage * 0.15;

  const damageVariance = Math.floor(
    Math.random() * (maxAttack - minAttack + 1) + minAttack
  );

  changeDamageNumber(damageVariance);

  if (playerStats.health.health - damageVariance <= 0) {
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
      health: playerStats.health.health - damageVariance,
      percentage:
        ((playerStats.health.health - damageVariance) /
          playerStats.health.initial) *
        100,
    },
  });

  return;
}

export default EnemyBasic;
