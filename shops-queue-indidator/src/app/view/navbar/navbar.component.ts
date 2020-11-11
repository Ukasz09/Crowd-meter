import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarkerModel } from 'src/app/model/marker';
import { AmenityType, PlaceCategory } from 'src/app/model/place-category';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { isBs3 } from 'ngx-bootstrap/utils';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  static readonly NAVBAR_HEIGHT_PX = 75;
  readonly LOGO_IMG_PATH = 'assets/images/logo-orange.png';
  @Input() categories: PlaceCategory[];
  @Input() searchSuggestions: SearchSuggestionModel[] = [];
  @Output() searchSuggestionChosen = new EventEmitter<MarkerModel>();
  @Output() logoClick = new EventEmitter<any>();
  isBs3 = isBs3();
  search: string;
  // categoriesForm: FormGroup;

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

  groupIsChecked(category: PlaceCategory): boolean {
    for (let amenity of category.amenities) {
      if (amenity.checked == false) return false;
    }
    return true;
  }

  amenityCheckedChange(amenity: AmenityType) {
    amenity.checked = !amenity.checked;
  }

  categoryCheckedChange(category: PlaceCategory) {
    let beforeValue = this.groupIsChecked(category);
    let newValue = !beforeValue;
    for (let amenity of category.amenities) amenity.checked = newValue;
  }
}
