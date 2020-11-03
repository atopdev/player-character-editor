export const SKILL_RANKS = [
  { label: 'Untrained', value: 0 },
  { label: 'Novice', value: 1 },
  { label: 'Apprentice', value: 2 },
  { label: 'Adept', value: 3 },
  { label: 'Expert', value: 4 },
  { label: 'Master', value: 5 }
];

export type BaseAttribute = 'strength' | 'dexterity' | 'mind' | 'presence';

export enum Skill {
  Fighting = 'Fighting',
  Thievery = 'Thievery',
  Stealth = 'Stealth',
  Archery = 'Archery',
  Learned = 'Learned',
  Survival = 'Survival',
  Perception = 'Perception',
  Apothecary = 'Apothecary',
  Intimidation = 'Intimidation',
  Performance = 'Performance',
  Manipulation = 'Manipulation',
  Insight = 'Insight',
  Power = 'Power'
}

export type SkillMap = {
  [key in Skill]: BaseAttribute[];
};

export const SKILL_MAP: SkillMap = {
  [Skill.Fighting]: ['strength', 'dexterity'],
  [Skill.Thievery]: ['dexterity'],
  [Skill.Stealth]: ['dexterity'],
  [Skill.Archery]: ['dexterity'],
  [Skill.Learned]: ['mind'],
  [Skill.Survival]: ['mind'],
  [Skill.Perception]: ['mind'],
  [Skill.Apothecary]: ['mind'],
  [Skill.Intimidation]: ['presence'],
  [Skill.Performance]: ['presence'],
  [Skill.Manipulation]: ['presence'],
  [Skill.Insight]: ['presence'],
  [Skill.Power]: ['presence', 'mind']
};

export type SkillRank = {
  [key in Skill]: number;
};

export type SkillExp = SkillRank;

export const ARMORS = [
  {
    value: 1,
    label: 'Arm',
    key: 'arm'
  },
  {
    value: 5,
    label: 'Leg',
    key: 'leg'
  },
  {
    value: 10,
    label: 'Chest',
    key: 'chest'
  }
];

export const WEAPONS = [
  {
    value: 1,
    label: 'Sword',
    key: 'sword'
  },
  {
    value: 2,
    label: 'Bow',
    key: 'bow'
  },
  {
    value: 5,
    label: 'Spear',
    key: 'spear'
  }
];

export const TRAITS = [
  {
    value: 1,
    label: 'Rage',
    key: 'range'
  },
  {
    value: 2,
    label: 'Quick',
    key: 'quick'
  },
  {
    value: 5,
    label: 'Fortitude',
    key: 'fortitude'
  }
];
