import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Skill, SKILL_RANKS } from '../../data/constant';

@Component({
  selector: 'app-skill-editor',
  templateUrl: './skill-editor.component.html',
  styleUrls: ['./skill-editor.component.scss']
})
export class SkillEditorComponent {
  @Input() skill: Skill;
  @Input() maxRank: number = 0;
  @Input() value: number = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  get rankOptions() {
    return SKILL_RANKS.filter((rank) => rank.value <= this.maxRank);
  }

  handleChange() {
    this.valueChange.emit(this.value);
  }
}
