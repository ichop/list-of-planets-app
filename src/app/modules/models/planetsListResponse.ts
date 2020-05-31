import {Planet} from './planet';

export class PlanetsListResponse {
  constructor(
    public count: number,
    public next: string,
    public previous: string,
    public results: Planet[]
    ) {  }
}
