import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { noop, Observable, Observer } from 'rxjs';
import { MarkerModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { switchMap } from 'rxjs/operators';
import { MarkersService } from 'src/app/services/markers.service';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  readonly LOGO_IMG_PATH = 'assets/images/logo.png';
  @Input() categories: PlaceCategory[];
  @Input() searchSuggestions: SearchSuggestionModel[] = [];
  search: string;

  constructor() {}

  ngOnInit(): void {}

  onSearchSelect(e: any) {
    console.log(e);
  }
}
