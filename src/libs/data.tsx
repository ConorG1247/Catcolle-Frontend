export const playerStatsData = {
  level: 5,
  health: {
    initial: 125,
    health: 125,
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
  initialStats: {
    strength: 10,
    intelligence: 10,
    defence: 10,
    dexterity: 10,
    agility: 10,
    chance: 10,
  },
  crit: 1,
  cdmg: 1.5,
  dodge: 5,
  attacks: [
    {
      name: "Slash",
      cost: 65,
      multiplier: 1.6,
      type: "attack",
      effect: "attack buff",
      description: "A heavy strike which increases strength temporarily.",
    },
    {
      name: "Slice",
      cost: 16,
      multiplier: 1.15,
      type: "attack",
      effect: "light attack",
      description: "Fast yet precise slice which does small damage.",
    },
    {
      name: "Dexterity Up",
      cost: 50,
      multiplier: 7000,
      type: "buff",
      effect: "self buff",
      description: "Increses dexterity for a short amount of time",
    },
  ],
};

export const enemyStatsData = {
  level: 6,
  health: {
    initial: 125,
    health: 125,
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
  initialStats: {
    strength: 10,
    intelligence: 10,
    defence: 10,
    dexterity: 10,
    agility: 10,
    chance: 10,
  },
  crit: 1,
  cdmg: 1.5,
  dodge: 5,
  attacks: [
    {
      name: "Stab",
      cost: 60,
      multiplier: 1.2,
      type: "attack",
      effect: "light attack",
      description: "A fast stab, effective but low damage.",
    },
  ],
};

/* Attacks 

Player Attacks

  Attack Buffs

    {
      name: "Slash",
      cost: 65,
      multiplier: 1.6,
      type: "attack",
      effect: "attack buff",
      description: "A heavy strike which increases strength temporarily.",
    },



    Light Attacks

    {
      name: "Slice",
      cost: 16,
      multiplier: 1.15,
      type: "attack",
      effect: "light attack",
      description: "Fast yet precise slice which does small damage.",
    },



   Buffs

    {
      name: "Dexterity Up",
      cost: 50,
      multiplier: 7000,
      type: "buff",
      effect: "self buff",
      description: "Increses dexterity for a short amount of time",
    },





Enemy Attacks

    Buff Attacks

    Light Attacks

    {
      name: "Stab",
      cost: 60,
      multiplier: 1.2,
      type: "attack",
      effect: "light attack",
      description: "A fast stab, effective but low damage.",
    },

    */
