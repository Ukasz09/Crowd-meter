import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MarkerDetailedModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { CategoryService } from 'src/app/services/category.service';
import { MarkersService } from 'src/app/services/markers.service';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  chosenMarker: MarkerDetailedModel;

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

  openModal(template: TemplateRef<any>, config: ModalOptions) {
    this.modalRef = this.modalService.show(template, config);
  }

  markerClickAction(markerModel: MarkerDetailedModel, template: TemplateRef<any>) {
    this.chosenMarker = markerModel;
    this.mapComponent.setMapView(
      markerModel.latitude,
      markerModel.longitude,
      MapComponent.focusOnMarkerZoom
    );
    const modalConfig: ModalOptions = { class: 'modal-lg' };
    this.openModal(template, modalConfig);
  }

  private fetchCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((data: PlaceCategory[]) => (this.categories = data));
  }

  private fetchMarkers() {
    this.markersService.getMarkers().subscribe((markers: MarkerDetailedModel[]) => {
      this.mapComponent.initMarkers(markers);
      this.initSearchSuggestions(markers);
    });
  }

  private initSearchSuggestions(markers: MarkerDetailedModel[]) {
    let suggestions: SearchSuggestionModel[] = [];
    for (let m of markers) {
      let suggestionValue = this.getSuggestionValueFromModel(m);
      let suggestionModel = new SearchSuggestionModel(m, suggestionValue);
      suggestions.push(suggestionModel);
    }
    this.searchSuggestions = suggestions;
  }

  private getSuggestionValueFromModel(marker: MarkerDetailedModel): string {
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

  onSearchSuggestionChosen(
    model: MarkerDetailedModel,
    detailModalTemplate: TemplateRef<any>
  ) {
    this.markerClickAction(model, detailModalTemplate);
  }

  get mapHeightStyle(): string {
    return 'calc(100vh - ' + NavbarComponent.NAVBAR_HEIGHT_PX + 'px';
  }

  onLogoClick() {
    let latLng: [number, number] = MapComponent.STARTED_LATLNG;
    let zoom = MapComponent.defaultZoom;
    this.mapComponent.setMapView(latLng[0], latLng[1], zoom);
  }
}
