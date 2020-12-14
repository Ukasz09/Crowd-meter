import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MarkerSchema } from 'src/app/data/schema/marker';
import { CategoryService } from 'src/app/data/service/category.service';
import { MarkersService } from 'src/app/data/service/markers.service';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion';
import { NavbarComponent } from 'src/app/shared/layouts/navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { PlaceCategorySchema } from 'src/app/data/schema/place-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  chosenMarker: MarkerSchema;

  placeCategories: PlaceCategorySchema[] = [];
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

  markerClickAction(markerModel: MarkerSchema, template: TemplateRef<any>) {
    this.chosenMarker = markerModel;
    this.mapComponent.setMapView(
      markerModel.latitude,
      markerModel.longitude,
      MapComponent.focusOnMarkerZoom
    );
    const modalConfig: ModalOptions = { class: 'modal-md' };
    this.openModal(template, modalConfig);
  }

  private fetchCategories() {
    this.categoriesService
      .getCategories()
      .subscribe(
        (data: PlaceCategorySchema[]) => (this.placeCategories = data)
      );
  }

  private fetchMarkers() {
    this.markersService.getMarkers().subscribe((markers: MarkerSchema[]) => {
      this.mapComponent.initMarkers(markers);
      this.mapComponent.showOnlyVisibleMarkersOnMap();
      this.initSearchSuggestions(markers);
    });
  }

  private initSearchSuggestions(markers: MarkerSchema[]) {
    let suggestions: SearchSuggestionModel[] = [];
    for (let m of markers) {
      let suggestionValue = this.getSuggestionValueFromModel(m);
      let suggestionModel = new SearchSuggestionModel(m, suggestionValue);
      suggestions.push(suggestionModel);
    }
    this.searchSuggestions = suggestions;
  }

  private getSuggestionValueFromModel(marker: MarkerSchema): string {
    let delim = ',';
    return (
      marker.name +
      delim +
      marker.city +
      delim +
      marker.street +
      delim +
      marker.houseNumber
    );
  }

  onSearchSuggestionChosen(
    model: MarkerSchema,
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
