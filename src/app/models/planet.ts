export class Planet {
  constructor(
    public name: string,
    public rotationPeriod: number,
    public orbitalPeriod: number,
    public diameter: number,
    public climate: string,
    public gravity: string,
    public terrain: string,
    public surfaceWater: string,
    public population: number
    //public residents: [],
    //public films: string[],
    //  public url: string
  ) {
  }
}
