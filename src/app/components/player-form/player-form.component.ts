import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Player } from '../../models/player.model';
import { Skill, ARMORS, WEAPONS, TRAITS } from '../../data/constant';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  data: Player;
  mode: string;
  playerIndex?: number;
  traitsObj: any = {};

  readonly skillTypes = Object.keys(Skill);
  readonly armors = ARMORS;
  readonly weapons = WEAPONS;
  readonly traits = TRAITS;

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _dataService: DataService
  ) {
    this.data = dialogData.player;
    this.mode = dialogData.mode;
    this.playerIndex = dialogData.playerIndex;
  }

  ngOnInit() {
    this.traitsObj = {};
    if (this.data.cTraits) {
      this.data.cTraits.forEach((trait) => (this.traitsObj[trait] = true));
    }
  }

  handleError(playerForm: NgForm, controlName: string, errorName: string) {
    return (
      playerForm.controls[controlName] &&
      playerForm.controls[controlName].hasError(errorName)
    );
  }

  handleClose() {
    this.dialogRef.close();
  }

  handleSubmit() {
    if (this.mode === 'new') {
      this._dataService.addPlayer(this.data);
    } else {
      this._dataService.updatePlayer(this.playerIndex, this.data);
    }

    this.dialogRef.close(1);
  }

  handleDamage() {
    this.data.takeDamage();
  }

  handleTenacity() {
    const value = window.prompt('Enter a tenacity value', '');
    this.data.addTenacity(+value);
  }

  handleTraitCheck(traitKey, event) {
    this.traitsObj[traitKey] = event.checked;
    this.data.cTraits = Object.keys(this.traitsObj);
  }
}
