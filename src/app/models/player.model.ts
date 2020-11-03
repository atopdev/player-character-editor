import {
  SkillRank,
  SKILL_MAP,
  Skill,
  SkillExp,
  ARMORS
} from '../data/constant';

const initialValues = {
  [Skill.Fighting]: 0,
  [Skill.Thievery]: 0,
  [Skill.Stealth]: 0,
  [Skill.Archery]: 0,
  [Skill.Learned]: 0,
  [Skill.Survival]: 0,
  [Skill.Perception]: 0,
  [Skill.Apothecary]: 0,
  [Skill.Intimidation]: 0,
  [Skill.Performance]: 0,
  [Skill.Manipulation]: 0,
  [Skill.Insight]: 0,
  [Skill.Power]: 0
};

export class Player {
  name: string = '';
  strength: number = 0;
  dexterity: number = 0;
  mind: number = 0;
  presence: number = 0;

  damage: number = 0;
  tenacityReceived: number = 0;
  skills: SkillRank = { ...initialValues };
  exps: SkillExp = { ...initialValues };

  cArmor: string = '';
  cWeapon: string = '';
  cTraits: string[] = [];

  constructor(json?: any) {
    this.loadWithJSON(json);
  }

  get vitality(): number {
    const vitality = this.strength + 3 - this.damage;
    return vitality > 0 ? vitality : 0;
  }

  get evasion(): number {
    return this.dexterity + 10;
  }

  get armor(): number {
    const armorItem = ARMORS.find((item) => item.key === this.cArmor);
    return this.evasion + (armorItem?.value || 0);
  }

  get alacrity(): number {
    return this.dexterity + this.mind;
  }

  get tenacity(): number {
    return this.presence + 1 + this.tenacityReceived;
  }

  get power(): number {
    return 0;
  }

  loadWithJSON(json: any) {
    this.name = json?.name || '';
    this.strength = json?.strength || 0;
    this.dexterity = json?.dexterity || 0;
    this.mind = json?.mind || 0;
    this.presence = json?.presence || 0;
    this.damage = json?.damage || 0;
    this.tenacityReceived = json?.tenacityReceived || 0;
    this.cArmor = json?.cArmor || '';
    this.cWeapon = json?.cWeapon || '';
    this.cTraits = json?.cTraits || '';
    Object.keys(Skill).map((item) => {
      this.skills[item] = (json?.skills && json?.skills[item]) || 0;
      this.exps[item] = (json?.exps && json?.exps[item]) || 0;
    });
  }

  toJSON() {
    const json: any = {
      name: this.name,
      strength: this.strength,
      dexterity: this.dexterity,
      mind: this.mind,
      presence: this.presence,
      damage: this.damage,
      tenacityReceived: this.tenacityReceived,
      skills: this.skills,
      exps: this.exps,
      cArmor: this.cArmor,
      cWeapon: this.cWeapon,
      cTraits: this.cTraits
    };
    return json;
  }

  takeDamage() {
    this.damage++;
  }

  getMaxRank(skill: Skill): number {
    return Math.min(...SKILL_MAP[skill].map((item) => this[item]));
  }

  addTenacity(value: number) {
    this.tenacityReceived += value;
  }
}
