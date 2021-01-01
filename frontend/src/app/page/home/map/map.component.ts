import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MarkerSchema } from 'src/app/data/schema/marker.schema';
import { PlaceCategoryModel } from 'src/app/model/place-category.model';
import { AmenityMarkers } from './amenity-markers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}
  static readonly STARTED_LATLNG: [number, number] = [51.107883, 17.038538];
  static readonly defaultZoom = 12;
  static readonly focusOnMarkerZoom = 21;
  private readonly TILE_PROVIDER = {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };

  @Input() categories: PlaceCategoryModel[] = [];
  @Output() markerClick: EventEmitter<any> = new EventEmitter();

  map: L.Map;
  markers: Map<string, L.LayerGroup<L.Marker>> = new Map(); // <amenity, layer>
  tileLayer: L.TileLayer;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map-container', {
      center: MapComponent.STARTED_LATLNG,
      zoom: MapComponent.defaultZoom,
    });
    this.initMapTiles();
  }

  private initMapTiles(): void {
    this.tileLayer = L.tileLayer(this.TILE_PROVIDER.urlTemplate, {
      maxZoom: 19,
      attribution: this.TILE_PROVIDER.attribution,
    });
    this.tileLayer.addTo(this.map);
  }

  initMarkers(markers: MarkerSchema[]): void {
    const markersMapArr: Map<string, Array<L.Marker>> = new Map();
    for (const model of markers) {
      if (markersMapArr.has(model.amenity)) {
        const markersArr: Array<L.Marker> = markersMapArr.get(model.amenity);
        markersArr.push(this.getMarker(model));
      } else {
        const markersArr: Array<L.Marker> = [];
        markersArr.push(this.getMarker(model));
        markersMapArr.set(model.amenity, markersArr);
      }
    }
    for (const markersEntry of markersMapArr.entries()) {
      const amenity: string = markersEntry[0];
      const markersLayer = L.layerGroup(markersEntry[1]);
      this.markers.set(amenity, markersLayer);
    }
  }

  showOnlyVisibleMarkersOnMap(): void {
    this.removeAllLayersExceptMap();
    this.addVisibleMarkersToMap();
  }

  private removeAllLayersExceptMap(): void {
    this.map.eachLayer((l) => {
      if (l !== this.tileLayer) {
        l.remove();
      }
    });
  }

  private addVisibleMarkersToMap(): void {
    for (const category of this.categories) {
      for (const amenity of category.amenities) {
        if (amenity.checked) {
          this.markers.get(amenity.id)?.addTo(this.map);
        }
      }
    }
  }

  private getMarker(model: MarkerSchema): L.Marker {
    const markerIcon = L.divIcon({
      className: 'bg-transparent',
      html: this.getMarkerHtml(model.amenity),
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
    const marker = L.marker([model.latitude, model.longitude], {
      icon: markerIcon,
    });
    marker.on('click', (_) => this.markerClick.emit(model));
    return marker;
  }

  setMapView(latitude: number, longitude: number, zoom: number): void {
    this.map.setView(new L.LatLng(latitude, longitude), zoom);
  }

  private getMarkerHtml(amenity: string): string {
    const icon = AmenityMarkers.AMENITY_MATERIAL_ICON[amenity] ?? 'trip_origin';
    return `<div style='${this.getMarkerWrapperStyles(amenity)}'
    class='test border border-secondary d-flex justify-content-center'>
    <div style='${this.getMarkerStyles()}' class='material-icons'>${icon}</div>
    </div>`;
  }

  /**
   * Because marker not recognize class
   */
  private getMarkerWrapperStyles(amenity: string): string {
    const category =
      this.categories.find((c) => c.amenities.find((a) => a.id === amenity))
        ._id ?? 'unknown';
    const color = AmenityMarkers.CATEGORIES_COLOR[category] ?? 'lightSalmon';
    return `transform: rotate(-45deg);
    border-radius: 50% 50% 50% 0;
    background-color: ${color};`;
  }

  private getMarkerStyles(): string {
    return `transform: rotate(45deg); margin:5px; font-size: 1.5em`;
  }
}
