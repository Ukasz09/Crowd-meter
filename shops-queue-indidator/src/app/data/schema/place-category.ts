export class AmenityTypeSchema {
  constructor(
    public id: string,
    public name: string,
    public checked: boolean
  ) {}
}

export class PlaceCategorySchema {
  constructor(
    public id: string,
    public name: string,
    public amenities: AmenityTypeSchema[]
  ) {}
}
