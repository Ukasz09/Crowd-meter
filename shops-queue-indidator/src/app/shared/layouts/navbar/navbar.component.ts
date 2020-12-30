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
  fieldsName = {
    name: 'name',
    city: 'city',
    street: 'street',
    houseNumber: 'house number',
  };

  @Input() categories: PlaceCategorySchema[];
  @Input() searchSuggestions: SearchSuggestionModel[] = [];
  @Input() fieldsUsedInSearchSuggestions: string[] = [];

  @Output() searchSuggestionChosen = new EventEmitter<MarkerSchema>();
  @Output() logoClick = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();

  isBs3 = isBs3();
  search: string;

  get searchPlaceholder(): string {
    const names: string[] = [];
    for (const fieldId of this.fieldsUsedInSearchSuggestions) {
      names.push(this.fieldsName[fieldId] ?? fieldId);
    }
    return names.join(', ');
  }

  constructor() {}

  ngOnInit(): void {}

  onSearchSelect(match: TypeaheadMatch): void {
    this.search = '';
    const searchSuggestion: SearchSuggestionModel = match.item;
    const markerModel = searchSuggestion.model;
    this.searchSuggestionChosen.emit(markerModel);
  }

  get navbarHeightPx(): number {
    return NavbarComponent.NAVBAR_HEIGHT_PX;
  }

  onLogoClick(): void {
    this.logoClick.emit();
  }

  groupIsChecked(category: PlaceCategorySchema): boolean {
    for (const amenity of category.amenities) {
      if (amenity.checked === false) {
        return false;
      }
    }
    return true;
  }

  amenityCheckedChange(amenity: AmenityTypeSchema): void {
    amenity.checked = !amenity.checked;
    this.filterChange.emit();
  }

  categoryCheckedChange(category: PlaceCategorySchema): void {
    const beforeValue = this.groupIsChecked(category);
    const newValue = !beforeValue;
    for (const amenity of category.amenities) {
      amenity.checked = newValue;
    }
    this.filterChange.emit();
  }
}
