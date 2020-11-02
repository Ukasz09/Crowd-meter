export class MarkerModel {
  constructor(
    public id: string,
    public latitude: number,
    public longitude: number,
    public city: string,
    public street: string,
    public housenumber: string,
    public amenity: string,
    public name: string
  ) {}
}

export class MarkerDetailedModel {
  constructor(
    public id: string,
    public latitude: number,
    public longitude: number,
    public street: string,
    public amenity: string,
    public name: string,
    public opening_hours: string,
    public website: string,
    public area: number,
    public numberOfPeoples: number = 0
  ) {}
}
