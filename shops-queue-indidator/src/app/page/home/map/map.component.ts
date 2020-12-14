import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MarkerSchema } from 'src/app/data/schema/marker';
import { PlaceCategorySchema } from 'src/app/data/schema/place-category';
import { AmenityMarkers } from './amenity-markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private readonly TILE_PROVIDER = {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };
  static readonly STARTED_LATLNG: [number, number] = [51.107883, 17.038538];
  static readonly defaultZoom = 12;
  static readonly focusOnMarkerZoom = 21;

  @Input() categories: PlaceCategorySchema[] = [];
  @Output() markerClick: EventEmitter<any> = new EventEmitter();

  map: L.Map;
  markers: Map<string, L.LayerGroup<L.Marker>> = new Map(); //<amenity, layer>

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map-container', {
      center: MapComponent.STARTED_LATLNG,
      zoom: MapComponent.defaultZoom,
    });
    this.initMapTiles();
  }

  private initMapTiles() {
    let tiles = L.tileLayer(this.TILE_PROVIDER.urlTemplate, {
      maxZoom: 19,
      attribution: this.TILE_PROVIDER.attribution,
    });
    tiles.addTo(this.map);
  }

  initMarkers(markers: MarkerSchema[]) {
    let markersMapArr: Map<string, Array<L.Marker>> = new Map();
    for (let model of markers) {
      if (markersMapArr.has(model.amenity)) {
        let markersArr: Array<L.Marker> = markersMapArr.get(model.amenity);
        markersArr.push(this.getMarker(model));
      } else {
        let markersArr: Array<L.Marker> = [];
        markersArr.push(this.getMarker(model));
        markersMapArr.set(model.amenity, markersArr);
      }
    }

    for (let markersEntry of markersMapArr.entries()) {
      let amenity: string = markersEntry[0];
      let markersLayer = L.layerGroup(markersEntry[1]);
      this.markers.set(amenity, markersLayer);
      markersLayer.addTo(this.map);
    }
  }

  private getMarker(model: MarkerSchema) {
    let markerIcon = L.divIcon({
      className: 'bg-transparent',
      html: this.getMarkerHtml(model.amenity),
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
    let marker = L.marker([model.latitude, model.longitude], {
      icon: markerIcon,
    });
    marker.on('click', (_) => this.markerClick.emit(model));
    return marker;
  }

  setMapView(latitude: number, longitude: number, zoom: number) {
    this.map.setView(new L.LatLng(latitude, longitude), zoom);
  }

  private getMarkerHtml(amenity: string) {
    let icon = AmenityMarkers.AMENITY_MATERIAL_ICON[amenity] ?? 'trip_origin';
    return `<div style='${this.getMarkerWrapperStyles(amenity)}' 
    class='test border border-secondary d-flex justify-content-center'>
    <div style='${this.getMarkerStyles()}' class='material-icons'>${icon}</div>
    </div>`;
  }

  /**
   * Because marker not recoginze class
   */
  private getMarkerWrapperStyles(amenity: string): string {
    let category =
      this.categories.find((c) => c.amenities.find((a) => a.name == amenity))
        .id ?? 'unknown';
    let color = AmenityMarkers.CATEGORIES_COLOR[category] ?? 'lightSalmon';
    return `transform: rotate(-45deg);
    border-radius: 50% 50% 50% 0;
    background-color: ${color};`;
  }

  private getMarkerStyles(): string {
    return `transform: rotate(45deg); margin:5px; font-size: 1.5em`;
  }
}
