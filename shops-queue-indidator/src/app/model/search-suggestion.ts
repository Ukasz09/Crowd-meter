import { MarkerModel } from './marker';

export class SearchSuggestionModel {
  constructor(public model: MarkerModel, public suggestion: string) {}
}
