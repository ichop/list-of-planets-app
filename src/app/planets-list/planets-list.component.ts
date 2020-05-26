import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {PlanetsListResponse} from '../models/planetsListResponse';
import {Planet} from '../models/planet';
import {forkJoin, Observable} from 'rxjs';
import {SharedService} from "../services/SharedService";


@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {


  planets: Planet[];
  observables: Observable<PlanetsListResponse>[] = [];
  isLoaded = false;
  columnsPerPage = 5;
  pageSize = 10;
  pageIndex = 1;
  elementCount = 10;
  searchPhrase = '';
  isCalledFromSearch = false;


  constructor(private dataService: DataService, private sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe(
      data => {
        console.log(data as string);
        if (data === '') {
          this.isCalledFromSearch = false;
        } else {
          this.isCalledFromSearch = true;
          this.searchPhrase = data as string;
        }
        this.pageIndex = 1;

        this.planetArrayPrepare();
      }
    );
  }

  ngOnInit() {
    this.planetArrayPrepare();
  }

  onPageFired(event) {
    this.pageIndex = event.pageIndex + 1;
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = 1;
    }
    this.planetArrayPrepare();
  }

  planetArrayPrepare() {
    this.isLoaded = false;
    this.planets = [];

    this.planetListResponsePrepare();

    forkJoin(this.observables).subscribe((data: PlanetsListResponse[]) => {
      this.elementCount = data[0].count;

      for (const planetsListResponse of data) {
        this.planets.push(...planetsListResponse.results);
      }
      if (this.pageSize === 5) {
        if (this.pageIndex % 2 === 0) {
          this.planets = this.planets.slice(0, 5);
        } else {
          this.planets = this.planets.slice(5, 10);
        }
      }
      if (this.pageSize === 25) {
        if (this.pageIndex % 2 === 0) {
          this.planets = this.planets.slice(5, 30);
        } else {
          this.planets = this.planets.slice(0, 25);
        }
      }
      this.isLoaded = true;
    });
  }

  planetListResponsePrepare() {
    let requestedPageIndex: number;
    const requestsPerPage: number = this.calculateRequestsPerPageNumber();
    const lastPossiblePageIndex: number = this.calcLastPossibleReqPageIndex();

    if (this.pageSize % 10 === 0) {
      for (let i = 0; i < requestsPerPage; i++) {
        requestedPageIndex = i + 1 + (requestsPerPage * (this.pageIndex - 1));
        this.fillObservablesList(requestedPageIndex, i);
      }
      //return;
    } else {
      if (this.pageSize > 10) {
        for (let i = 0; i < requestsPerPage; i++) {
          if (this.pageIndex === 1) {
            requestedPageIndex = i + 1;
          } else if (this.pageIndex === 2) {
            requestedPageIndex = i + (requestsPerPage * (this.pageIndex - 1));
          } else {
            if (this.pageIndex % 2 === 0) {
              requestedPageIndex = (i + (requestsPerPage * (this.pageIndex - 1) - 1));
            } else {
              requestedPageIndex = (i + (requestsPerPage * (this.pageIndex - 1)));
            }
          }
          this.fillObservablesList(requestedPageIndex, i);
          if (requestedPageIndex === lastPossiblePageIndex) {
            return;
          }
        }
      } else {
        for (let i = 0; i < requestsPerPage; i++) {
          requestedPageIndex = Math.ceil(this.pageIndex / 2);
          this.fillObservablesList(requestedPageIndex, i);
        }
      }
      // return;
    }
  }

  fillObservablesList(requestedPageIndex: number, i: number) {
    console.log(this.isCalledFromSearch);
    if (this.isCalledFromSearch) {
      this.observables[i] = this.dataService.get(this.buildUrlFromPhrase(this.searchPhrase, requestedPageIndex));
    } else {
      this.observables[i] = this.dataService.get(this.buildUrlFromPageIndex(requestedPageIndex));
    }
  }

  buildUrlFromPhrase(phrase: string, pageIndex: number): string {
    return `?search=${phrase}&page=${pageIndex}`;
  }

  buildUrlFromPageIndex(pageIndex: number): string {
    return `?page=${pageIndex}`;
  }


  calculateRequestsPerPageNumber(): number {
    let requestsCount: number;
    if (this.pageSize > this.elementCount) {
      requestsCount = (Math.round(this.elementCount / 10));
    } else {
      requestsCount = (Math.round(this.pageSize / 10));
    }
    return requestsCount;
  }

  calcLastPossibleReqPageIndex(): number {
    return (Math.ceil(this.elementCount) / 10);
  }
}


