import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MarkerSchema } from 'src/app/data/schema/marker.schema';
import { CategoryService } from 'src/app/data/service/category.service';
import { MarkersService } from 'src/app/data/service/markers.service';
import { SearchSuggestionModel } from 'src/app/model/search-suggestion.model';
import { NavbarComponent } from 'src/app/shared/layouts/navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { PlaceCategoryModel } from 'src/app/model/place-category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fieldsUsedInSearchSuggestions = ['name', 'city', 'street', 'houseNumber'];
  modalRef: BsModalRef;
  chosenMarker: MarkerSchema;
  markersSchema: MarkerSchema[] = [];
  placeCategories: PlaceCategoryModel[] = [];
  searchSuggestions: SearchSuggestionModel[] = [];
  dataFetchingErrResponse: HttpErrorResponse = undefined;
  isDataFetchingError = false;
  markersFetched = false;

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

  openModal(template: TemplateRef<any>, config: ModalOptions): void {
    this.modalRef = this.modalService.show(template, config);
  }

  markerClickAction(
    markerModel: MarkerSchema,
    template: TemplateRef<any>
  ): void {
    this.chosenMarker = markerModel;
    this.mapComponent.setMapView(
      markerModel.latitude,
      markerModel.longitude,
      MapComponent.focusOnMarkerZoom
    );
    const modalConfig: ModalOptions = { class: 'modal-md' };
    this.openModal(template, modalConfig);
  }

  private fetchCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (data: PlaceCategoryModel[]) => {
        this.placeCategories = data;
      },
      (err) => {
        this.dataFetchingErrResponse = err;
        this.isDataFetchingError = true;
        throw err;
      }
    );
  }

  private fetchMarkers(): void {
    this.markersService.getMarkers().subscribe(
      (markers: MarkerSchema[]) => {
        this.markersSchema = markers;
        this.mapComponent.initMarkers(markers);
        this.mapComponent.showOnlyVisibleMarkersOnMap();
        this.updateSearchSuggestions();
        this.markersFetched = true;
      },
      (err) => {
        this.dataFetchingErrResponse = err;
        this.isDataFetchingError = true;
        throw err;
      }
    );
  }

  private updateSearchSuggestions(): void {
    let visibleMarkersAmenities: string[] = [];
    for (const category of this.mapComponent.categories) {
      visibleMarkersAmenities = visibleMarkersAmenities.concat(
        category.amenities.filter((a) => a.checked).map((a) => a.id)
      );
    }

    const markers = this.markersSchema.filter((m) =>
      visibleMarkersAmenities.includes(m.amenity)
    );
    this.initSearchSuggestions(markers);
  }

  private initSearchSuggestions(markers: MarkerSchema[]): void {
    const suggestions: SearchSuggestionModel[] = [];
    for (const m of markers) {
      const suggestionValue = this.getSuggestionValueFromModel(m);
      const suggestionModel = new SearchSuggestionModel(m, suggestionValue);
      suggestions.push(suggestionModel);
    }
    this.searchSuggestions = suggestions;
  }

  private getSuggestionValueFromModel(marker: MarkerSchema): string {
    const delimiter = ',';
    let suggestion = '';
    for (const field of this.fieldsUsedInSearchSuggestions) {
      suggestion += marker[field] + delimiter;
    }
    return suggestion;
  }

  onSearchSuggestionChosen(
    model: MarkerSchema,
    detailModalTemplate: TemplateRef<any>
  ): void {
    this.markerClickAction(model, detailModalTemplate);
  }

  get mapHeightStyle(): string {
    return 'calc(100vh - ' + NavbarComponent.NAVBAR_HEIGHT_PX + 'px';
  }

  onLogoClick(): void {
    const latLng: [number, number] = MapComponent.STARTED_LATLNG;
    const zoom = MapComponent.defaultZoom;
    this.mapComponent.setMapView(latLng[0], latLng[1], zoom);
  }

  onFilterChange(): void {
    this.mapComponent.showOnlyVisibleMarkersOnMap();
    this.updateSearchSuggestions();
  }
}
