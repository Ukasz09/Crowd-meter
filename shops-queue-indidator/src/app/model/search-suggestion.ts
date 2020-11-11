import { MarkerDetailedModel } from './marker';

export class SearchSuggestionModel {
  constructor(public model: MarkerDetailedModel, public suggestion: string) {}
}
