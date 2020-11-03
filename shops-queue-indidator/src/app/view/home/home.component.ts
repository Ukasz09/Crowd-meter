import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MarkerModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { CategoryService } from 'src/app/services/category.service';
import { MarkersService } from 'src/app/services/markers.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  chosenMarker: MarkerModel;

  categories: PlaceCategory[] = [];
  searchSuggestions: SearchSuggestionModel[] = [];

  @ViewChild(MapComponent) mapComponent: MapComponent;

  constructor(
    private modalService: BsModalService,
    private categoriesService: CategoryService,
    private markersService: MarkersService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchMarkers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  markerClickAction(markerModel: MarkerModel, template: TemplateRef<any>) {
    this.chosenMarker = markerModel;
    this.openModal(template);
  }

  private fetchCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((data: PlaceCategory[]) => (this.categories = data));
  }

  private fetchMarkers() {
    this.markersService.getMarkers().subscribe((markers: MarkerModel[]) => {
      this.mapComponent.initMarkers(markers);
      this.initSearchSuggestions(markers);
    });
  }

  private initSearchSuggestions(markers: MarkerModel[]) {
    let suggestions: SearchSuggestionModel[] = [];
    for (let m of markers) {
      let suggestionValue = this.getSuggestionValueFromModel(m);
      let suggestionModel = new SearchSuggestionModel(m, suggestionValue);
      suggestions.push(suggestionModel);
    }
    this.searchSuggestions = suggestions;
  }

  private getSuggestionValueFromModel(marker: MarkerModel): string {
    let delim = ',';
    return (
      marker.name +
      delim +
      marker.city +
      delim +
      marker.street +
      delim +
      marker.housenumber +
      delim +
      marker.amenity
    );
  }
}
