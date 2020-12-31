import { AmenityTypeModel } from 'src/app/model/amenity-type.model';

export class PlaceCategoryModel {
  constructor(
    public id: string,
    public name: string,
    public amenities: AmenityTypeModel[]
  ) {}
}
