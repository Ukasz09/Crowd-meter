import { MarkerSchema } from '../data/schema/marker.schema';

export class SearchSuggestionModel {
  constructor(public model: MarkerSchema, public suggestion: string) {}
}
