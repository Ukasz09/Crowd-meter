import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarkerSchema } from 'src/app/data/schema/marker';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { isBs3 } from 'ngx-bootstrap/utils';
import {
  AmenityTypeSchema,
  PlaceCategorySchema,
} from 'src/app/data/schema/place-category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  static readonly NAVBAR_HEIGHT_PX = 75;
  readonly LOGO_IMG_PATH = 'assets/images/logo-orange.png';
  @Input() categories: PlaceCategorySchema[];
  @Input() searchSuggestions: SearchSuggestionModel[] = [];
  @Output() searchSuggestionChosen = new EventEmitter<MarkerSchema>();
  @Output() logoClick = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();
  isBs3 = isBs3();
  search: string;

  constructor() {}

  ngOnInit(): void {}

  onSearchSelect(match: TypeaheadMatch) {
    this.search = '';
    let searchSuggestion: SearchSuggestionModel = match.item;
    let markerModel = searchSuggestion.model;
    this.searchSuggestionChosen.emit(markerModel);
  }

  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  onLogoClick() {
    this.logoClick.emit();
  }

  groupIsChecked(category: PlaceCategorySchema): boolean {
    for (let amenity of category.amenities) {
      if (amenity.checked == false) return false;
    }
    return true;
  }

  amenityCheckedChange(amenity: AmenityTypeSchema) {
    amenity.checked = !amenity.checked;
    this.filterChange.emit();
  }

  categoryCheckedChange(category: PlaceCategorySchema) {
    let beforeValue = this.groupIsChecked(category);
    let newValue = !beforeValue;
    for (let amenity of category.amenities) amenity.checked = newValue;
    this.filterChange.emit();
  }
}
