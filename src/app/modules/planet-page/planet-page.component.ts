import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {combineLatest, Observable} from 'rxjs';

import {Planet} from '../models/planet';
import {DataService} from '../services/data.service';
import {Film} from '../models/film';
import {Resident} from '../models/resident';


@Component({
  selector: 'app-planet-page',
  templateUrl: './planet-page.component.html',
  styleUrls: ['./planet-page.component.scss']
})
export class PlanetPageComponent implements OnInit {
  planet: Planet;
  planetKeys: object;
  planetValues: object;
  filmObservables: Observable<Film>[] = [];
  residentsObservables: Observable<Resident>[] = [];
  filmTitles: string[] = [];
  residentName: string[] = [];
  isLoaded = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService
  ) {
    this.planet = data as Planet;
    this.getAdditionalDataReq();
  }

  ngOnInit() {
  }

  getAdditionalDataReq() {
    let skipSubscribe = false;
    this.planet.films.forEach((film, index) => {
      try {
        const pathname = new URL(film).pathname.slice(5);
        this.filmObservables[index] = this.dataService.get(pathname);
      } catch {
        skipSubscribe = true;
      }
    });
    this.planet.residents.forEach((resident, index) => {
      try {
        const pathname = new URL(resident).pathname.slice(5);
        this.residentsObservables[index] = this.dataService.get(pathname);
      } catch {
        skipSubscribe = true;
      }
    });

    if (!skipSubscribe) {
      combineLatest([...this.filmObservables, ...this.residentsObservables]).subscribe((data: object[]) => {
        for (const obj of data) {
          if ('name' in obj) {
            const resident: Resident = obj as Resident;
            this.residentName.push(String(resident.name));
          } else {
            const film: Film = obj as Film;
            this.filmTitles.push(String(film.title));
          }
        }
        this.planet.residents = this.residentName;
        this.planet.films = this.filmTitles;
        this.parsePlanet();
        this.isLoaded = true;
      });
    } else {
      this.parsePlanet();
      this.isLoaded = true;
    }

  }

  parsePlanet() {
    this.planetKeys = Object.keys(this.planet);
    this.planetValues = Object.values(this.planet);
  }
}
