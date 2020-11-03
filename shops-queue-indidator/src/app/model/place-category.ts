export class AmenityType {
  constructor(public id: string, public name: string) {}
}

export class PlaceCategory {
  constructor(
    public id: string,
    public name: string,
    public amenities: AmenityType[]
  ) {}
}
