import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exp-generator',
  templateUrl: './exp-generator.component.html',
  styleUrls: ['./exp-generator.component.scss']
})
export class ExpGeneratorComponent {
  @Input() value: number = 0;
  @Input() rank: number = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  handleClick() {
    if (this.rank === 0) {
      this.value = Math.min(
        this._randomFromRange(1, 20),
        this._randomFromRange(1, 20)
      );
    } else {
      this.value =
        this._randomFromRange(1, 20) +
        this._randomFromRange(1, 4 + (this.rank - 1) * 2);
    }

    this.valueChange.emit(this.value);
  }

  private _randomFromRange(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
  }
}
