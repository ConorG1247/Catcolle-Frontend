export type health = {
  initial: number;
  health: number;
  percentage: number;
};

export type stats = {
  endurance: number;
  strength: number;
  intelligence: number;
  defence: number;
  dexterity: number;
  agility: number;
};

export type attacks = {
  name: string;
  cost: number;
  multiplier: number;
  type: string;
  effect: string;
  description: string;
};

export type playerStats = {
  level: number;
  health: health;
  stats: stats;
  attacks: attacks[];
};

export type eStats = {
  strength: number;
  intelligence: number;
  defence: number;
  dexterity: number;
  agility: number;
};

export type enemyStats = {
  level: number;
  health: health;
  stats: eStats;
  attacks: attacks[];
};
