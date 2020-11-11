export class AmenityType {
  constructor(
    public id: string,
    public name: string,
    public checked: boolean
  ) {}
}

export class PlaceCategory {
  constructor(
    public id: string,
    public name: string,
    public amenities: AmenityType[]
  ) {}
}
