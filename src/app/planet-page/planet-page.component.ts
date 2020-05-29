import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Planet} from "../models/planet";
//import {Planet} from '../models/planet';


@Component({
  selector: 'app-planet-page',
  templateUrl: './planet-page.component.html',
  styleUrls: ['./planet-page.component.scss']
})
export class PlanetPageComponent implements OnInit {


  planet: Planet;
  planetAsObject: object;

  constructor(
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.planet = data as Planet;
    console.log(this.planet);
    this.planetAsObject = Object.values(data as Planet);
  }

  ngOnInit() {
  }

}
