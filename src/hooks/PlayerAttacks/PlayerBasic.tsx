import { enemyStats, playerStats } from "libs/types";

function PlayerBasic(
  playerStats: playerStats,
  enemyStats: enemyStats,
  addCharge: () => void,
  changeEnemyHealth: (changes: enemyStats) => void,
  changeBattleCheck: () => void
) {
  let attackDamage = Math.floor(
    (playerStats.level * 4) / 2 +
      ((playerStats.stats.strength * 0.4 +
        playerStats.stats.agility * 0.3 +
        playerStats.stats.intelligence * 0.3 +
        playerStats.stats.dexterity * 0.7) /
        2 -
        enemyStats.stats.defence * 0.4)
  );

  const critChance = playerStats.stats.chance * 0.4;

  if (critChance >= Math.floor(Math.random() * 100)) {
    attackDamage = attackDamage * 1.6 + playerStats.stats.chance * 0.2;
  }

  const maxAttack = attackDamage + attackDamage * 0.15;
  const minAttack = attackDamage - attackDamage * 0.15;

  const damageVariance = Math.floor(
    Math.random() * (maxAttack - minAttack + 1) + minAttack
  );

  addCharge();

  if (enemyStats.health.health - damageVariance <= 0) {
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
      health: enemyStats.health.health - damageVariance,
      percentage:
        ((enemyStats.health.health - damageVariance) /
          enemyStats.health.initial) *
        100,
    },
  });
  return;
}

export default PlayerBasic;
