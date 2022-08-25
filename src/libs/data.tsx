export const playerStatsData = {
  level: 5,
  health: {
    initial: 125,
    health: 125,
    percentage: 100,
  },
  stats: {
    endurance: 25,
    strength: 10,
    intelligence: 10,
    defence: 10,
    dexterity: 10,
    agility: 10,
    chance: 10,
  },
  attacks: [
    {
      name: "Slash",
      cost: 70,
      multiplier: 1.6,
      type: "attack",
      effect: "light attack",
      description: "A quick slashing move which does medium damage.",
    },
  ],
};

export const enemyStatsData = {
  level: 7,
  health: {
    initial: 135,
    health: 135,
    percentage: 100,
  },
  stats: {
    strength: 10,
    intelligence: 10,
    defence: 10,
    dexterity: 10,
    agility: 10,
    chance: 10,
  },
  attacks: [
    {
      name: "Slash",
      cost: 70,
      multiplier: 1.6,
      type: "attack",
      effect: "light attack",
      description: "A quick slashing move which does medium damage.",
    },
  ],
};
