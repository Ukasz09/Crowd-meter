import { MarkerSchema } from '../data/schema/marker';

export class SearchSuggestionModel {
  constructor(public model: MarkerSchema, public suggestion: string) {}
}
