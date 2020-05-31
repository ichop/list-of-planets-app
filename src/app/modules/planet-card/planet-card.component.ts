import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {PlanetPageComponent} from '../planet-page/planet-page.component';
import {Planet} from '../models/planet';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent implements OnInit {

  @Input()
  planet: Planet;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }


  openPlanetPage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.planet;
    dialogConfig.width = 0.8 * window.innerWidth + 'px';
    // dialogConfig.disableClose = true;
    this.dialog.open(PlanetPageComponent, dialogConfig);
  }
}
