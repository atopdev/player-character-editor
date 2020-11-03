import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable()
export class DataService {
  private _players: Player[] = [];

  getPlayers(): Player[] {
    return this._players;
  }

  addPlayer(player: Player) {
    this._players.push(player);
  }

  updatePlayer(index: number, player: Player) {
    this._players = [
      ...this._players.slice(0, index),
      player,
      ...this._players.slice(index + 1)
    ];
  }

  deletePlayer(index: number) {
    this._players = [
      ...this._players.slice(0, index),
      ...this._players.slice(index + 1)
    ];
  }

  export() {
    const fileContent = this._players.map((player) => player.toJSON());
    const blobData = new Blob([JSON.stringify(fileContent)], {
      type: 'text/plain;charset=utf-8'
    });
    const a = document.createElement('a');
    a.download = 'players.json';
    a.href = window.URL.createObjectURL(blobData);
    a.click();
  }

  loadPlayers(players: Player[]) {
    this._players = [...players];
  }
}
