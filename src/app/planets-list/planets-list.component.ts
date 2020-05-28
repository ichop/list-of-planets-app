import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {PlanetsListResponse} from '../models/planetsListResponse';
import {Planet} from '../models/planet';
import {forkJoin, Observable} from 'rxjs';
import {SharedService} from '../services/SharedService';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  planets: Planet[];
  observables: Observable<PlanetsListResponse>[] = [];

  isLoaded = false;
  columnsPerPage = 5;

  pageSize = 10;
  pageIndex = 1;
  elementCount = 10;
  elementCountMax = 0;

  searchPhrase = '';
  isCalledFromSearch = false;

  constructor(private dataService: DataService, private sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe(
      data => {
        this.onSearchFieldChange(data);
      }
    );
  }

  private async onSearchFieldChange(data: any) {
    if (data === '') {
      this.isCalledFromSearch = false;
      this.elementCount = this.elementCountMax;
    } else {
      this.isCalledFromSearch = true;
      this.searchPhrase = data as string;
      await this.makeInitialSearchRequest().then((response: PlanetsListResponse) => {
        this.elementCount = response.count;
      });
    }
    this.paginator.pageIndex = 0;
    this.pageIndex = this.paginator.pageIndex + 1;
    this.planetArrayPrepare();
  }

  private async makeInitialSearchRequest(): Promise<PlanetsListResponse> {
    return await this.dataService.get(this.buildUrlFromPhrase(this.searchPhrase, 1)).toPromise();
  }

  ngOnInit() {
    this.planetArrayPrepare();
  }

  private onPageFired(event) {
    console.log('works');
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;
    }
    this.pageIndex = this.paginator.pageIndex + 1;
    this.planetArrayPrepare();
  }

  private planetArrayPrepare() {
    this.isLoaded = false;
    this.planets = [];

    this.planetListResponsePrepare();

    forkJoin(this.observables).subscribe((data: PlanetsListResponse[]) => {

      this.elementCount = data[0].count;
      if (this.elementCount > this.elementCountMax) {
        this.elementCountMax = this.elementCount;
      }

      for (const planetsListResponse of data) {
        this.planets.push(...planetsListResponse.results);
      }
      if (this.pageSize === 5) {
        if (this.pageIndex % 2 === 0) {
          this.planets = this.planets.slice(5, 10);
        } else {
          this.planets = this.planets.slice(0, 5);
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

  private planetListResponsePrepare() {
    let requestedPageIndex: number;
    const requestsPerPage: number = this.calculateRequestsPerPageNumber();
    const lastPossiblePageIndex: number = this.calcLastPossibleReqPageIndex();
    this.observables = [];

    console.log('requestsPerPage ' + requestsPerPage);
    console.log('lastPossiblePageIndex' + lastPossiblePageIndex);

    if (this.pageSize % 10 === 0) {
      for (let i = 0; i < requestsPerPage; i++) {
        requestedPageIndex = i + 1 + (requestsPerPage * (this.pageIndex - 1));
        this.fillObservablesList(requestedPageIndex, i);
        if (requestedPageIndex === lastPossiblePageIndex) {
          return;
        }
      }
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
    }
  }

  private fillObservablesList(requestedPageIndex: number, i: number) {
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


  private calculateRequestsPerPageNumber(): number {
    let requestsCount: number;
    if (this.pageSize > this.elementCount) {
      requestsCount = (Math.round(this.elementCount / 10));
    } else {
      requestsCount = (Math.round(this.pageSize / 10));
    }
    return requestsCount;
  }

  private calcLastPossibleReqPageIndex(): number {
    console.log((Math.ceil(this.elementCount / 10)));
    return (Math.ceil(this.elementCount / 10));
  }
}


