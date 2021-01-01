export class MarkerSchema {
  constructor(
    public _id: number,
    public latitude: number,
    public longitude: number,
    public city: string,
    public street: string,
    public houseNumber: string,
    public amenity: string,
    public name: string,
    public openingHours: OpenHoursModel,
    public website: string,
    public numberOfFreeSpace: number,
    public numberOfPeoples: number = 0
  ) {}
}

export class OpenHoursModel {
  constructor(
    public monday: string,
    public tuesday: string,
    public wednesday: string,
    public thursday: string,
    public friday: string,
    public saturday: string,
    public sunday: string
  ) {}
}
