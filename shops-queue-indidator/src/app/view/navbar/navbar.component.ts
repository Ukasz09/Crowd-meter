import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { noop, Observable, Observer } from 'rxjs';
import { MarkerModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { switchMap } from 'rxjs/operators';
import { MarkersService } from 'src/app/services/markers.service';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  readonly LOGO_IMG_PATH = 'assets/images/logo.png';
  @Input() categories: PlaceCategory[];
  @Input() searchSuggestions: SearchSuggestionModel[] = [];
  @Output() searchSuggestionChosen = new EventEmitter<MarkerModel>();

  search: string;

  constructor() {}

  ngOnInit(): void {}

  onSearchSelect(match: TypeaheadMatch) {
    this.search = '';
    let searchSuggestion: SearchSuggestionModel = match.item;
    let markerModel = searchSuggestion.model;
    this.searchSuggestionChosen.emit(markerModel);
  }
}
