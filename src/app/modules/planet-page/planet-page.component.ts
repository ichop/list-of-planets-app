import {Component, HostBinding, HostListener, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {combineLatest, Observable} from 'rxjs';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {DatePipe} from '@angular/common';

import {Planet} from '../models/planet';
import {DataService} from '../services/data.service';
import {Film} from '../models/film';
import {Resident} from '../models/resident';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';


interface DataNode {
  name: string;
  children?: DataNode[];
}

@Component({
  selector: 'app-planet-page',
  templateUrl: './planet-page.component.html',
  styleUrls: ['./planet-page.component.scss'],
})
export class PlanetPageComponent implements OnInit {

  planet: Planet;
  filmObservables: Observable<Film>[] = [];
  residentsObservables: Observable<Resident>[] = [];
  filmTitles: string[] = [];
  residentName: string[] = [];
  treeData: DataNode[] = [];
  imageSrc: string;
  isLoaded = false;

  treeControl = new NestedTreeControl<DataNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DataNode>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService,
    private datePipe: DatePipe,
    private dialog: MatDialogRef<PlanetPageComponent>
  ) {
    this.planet = data[0] as Planet;
    this.imageSrc = data[1];
    this.getAdditionalDataReq();
  }

  ngOnInit() {
  }

  hasChild = (_: number, node: DataNode) => !!node.children && node.children.length > 0;

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
        this.dataTreeStructurePrepare();
        this.isLoaded = true;
      });
    } else {
      this.dataTreeStructurePrepare();
      this.isLoaded = true;
    }
  }

  dataTreeStructurePrepare() {
    Object.entries(this.planet).forEach((entry: [string, any], index) => {
      const dataNode: DataNode = {name: this.dataTreeStringFormat(entry[0])};
      const childrenArray: DataNode[] = [];
      if (entry[1] instanceof Array) {
        entry[1].forEach((node) => {
          const children: DataNode = {name: ''};
          children.name = node;
          childrenArray.push(children);
        });
      } else {
        if (entry[0] === 'created' || entry[0] === 'edited') {
          entry[1] = this.datePipe.transform(new Date(entry[1]), 'dd-MM-yyyy');
        }
        const children: DataNode = {name: ''};
        children.name = entry[1];
        childrenArray.push(children);
      }

      dataNode.children = childrenArray;
      this.treeData.push(dataNode);
    });
    this.dataSource.data = this.treeData;
  }

  dataTreeStringFormat(key: string): string {
    key = key.charAt(0).toUpperCase() + key.slice(1).replace("_", "  ");
    return key;
  }

  close() {
    this.dialog.close();
  }
}
