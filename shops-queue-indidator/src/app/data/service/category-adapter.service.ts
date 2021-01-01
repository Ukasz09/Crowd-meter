import { Injectable } from '@angular/core';
import { AmenityTypeModel } from 'src/app/model/amenity-type.model';
import { PlaceCategoryModel } from 'src/app/model/place-category.model';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdapterService implements Adapter<PlaceCategoryModel> {
  visibleOnStartupAmenities = ['cafe', 'cinema', 'nightclub', 'theatre'];

  constructor() {}

  adapt(data: any): PlaceCategoryModel {
    return new PlaceCategoryModel(
      data._id,
      data.name,
      this.adaptAmenities(data.amenities)
    );
  }

  private adaptAmenities(data: any[]): AmenityTypeModel[] {
    const amenities: AmenityTypeModel[] = [];
    for (const amenity of data) {
      amenities.push(
        new AmenityTypeModel(
          amenity.id,
          amenity.name,
          this.isVisible(amenity.id)
        )
      );
    }
    return amenities;
  }

  private isVisible(amenityId: string): boolean {
    return this.visibleOnStartupAmenities.includes(amenityId);
  }
}
