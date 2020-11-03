import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { DataService } from './services/data.service';
import { Player } from './models/player.model';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class AppComponent implements OnInit {
  columnsToDisplay: string[] = [
    'name',
    'strength',
    'dexterity',
    'mind',
    'presence'
  ];
  allColumnsToDisplay: string[] = [...this.columnsToDisplay, 'actions'];
  dataSource: Player[];
  expandedElement: Player | null;

  @ViewChild('file') fileInput: ElementRef<HTMLInputElement>;

  constructor(private _dataService: DataService, private _dialog: MatDialog) {}

  ngOnInit() {
    this._loadData();
  }

  handleAddPlayer() {
    this._dialog
      .open(PlayerFormComponent, {
        data: { player: new Player(), mode: 'new' }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 1) {
          this._loadData();
        }
      });
  }

  handleEditPlayer(event: MouseEvent, playerIndex: number, player: Player) {
    event.stopPropagation();
    this._dialog
      .open(PlayerFormComponent, {
        data: { player: new Player(player.toJSON()), mode: 'edit', playerIndex }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 1) {
          this._loadData();
        }
      });
  }

  handleDeletePlayer(event: MouseEvent, playerIndex: number) {
    event.stopPropagation();
    if (window.confirm('Are you sure to delete this player?')) {
      this._dataService.deletePlayer(playerIndex);
      this._loadData();
    }
  }

  handleExport() {
    this._dataService.export();
  }

  handleImport() {
    this.fileInput.nativeElement.click();
  }

  handleReadFile(event?: HTMLInputEvent) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const data = JSON.parse(fileReader.result as string);
        const players = data.map((item) => new Player(item));
        this._dataService.loadPlayers(players);
        this._loadData();
        this.fileInput.nativeElement.value = '';
      } catch (err) {
        console.log(err);
      }
    };

    fileReader.readAsText(event.target.files[0]);
  }

  private _loadData() {
    this.dataSource = [...this._dataService.getPlayers()];
  }
}
