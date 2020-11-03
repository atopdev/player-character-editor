import { Component, Input } from '@angular/core';
import { Player } from '../../models/player.model';
import {
  ARMORS,
  Skill,
  SKILL_RANKS,
  WEAPONS,
  TRAITS
} from '../../data/constant';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent {
  @Input() player: Player;
  @Input() skipBase: boolean = true;

  readonly skillTypes = Object.keys(Skill);

  getSkillRank(value: number): string {
    return SKILL_RANKS.find((item) => item.value === value).label;
  }

  getArmorName(key: string): string {
    return ARMORS.find((item) => item.key === key)?.label || 'N/A';
  }

  getWeaponName(key: string): string {
    return WEAPONS.find((item) => item.key === key)?.label || 'N/A';
  }

  getTraitNames(keys: string[]): string {
    return (
      TRAITS.filter((item) => keys.includes(item.key))
        .map((item) => item.label)
        .join(', ') || 'N/A'
    );
  }
}
