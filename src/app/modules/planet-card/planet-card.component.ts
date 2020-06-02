import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {PlanetPageComponent} from '../planet-page/planet-page.component';
import {Planet} from '../models/planet';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.scss'],
  animations: [fadeStateTrigger]
})
export class PlanetCardComponent implements OnInit {

  @Input()
  planet: Planet;

  isSelected = false;
  imageSrc: string;
  isLoaded = false;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.imageChoose();
    this.isLoaded = true;
  }

  imageChoose() {
    if (this.planet.climate.includes('frozen')) {
      this.imageSrc = '../../../assets/blueplanet.svg';
    } else if  (this.planet.climate.includes('temperate')) {
      this.imageSrc = '../../../assets/greenplanet.svg';
    } else if  (this.planet.climate.includes('arid')) {
      this.imageSrc = '../../../assets/aridplanet.svg';
    } else if  (this.planet.climate.includes('hot')) {
      this.imageSrc = '../../../assets/redplanet.svg';
    } else {
      this.imageSrc = '../../../assets/planet.svg';
    }
  }

  openPlanetPage() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = [this.planet, this.imageSrc];
    dialogConfig.width = 0.8 * window.innerWidth + 'px';
    dialogConfig.disableClose = true;
    this.dialog.open(PlanetPageComponent, dialogConfig);
  }

  mouseOn() {
    this.isSelected = true;
  }

  mouseOut() {
    this.isSelected = false;
  }
}
