import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MarkerModel } from 'src/app/model/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private readonly STARTED_LATLNG: [number, number] = [51.107883, 17.038538];
  private readonly TILE_PROVIDER = {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };
  static readonly defaultZoom = 12;
  static readonly focusOnMarkerZoom = 21;

  @Output() markerClick: EventEmitter<any> = new EventEmitter();

  map: L.Map;
  markers: Map<string, L.LayerGroup<L.Marker>> = new Map(); //<amenity, layer>

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map-container', {
      center: this.STARTED_LATLNG,
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

  initMarkers(markers: MarkerModel[]) {
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

  private getMarker(model: MarkerModel) {
    let marker = L.marker([model.latitude, model.longitude]);
    marker.on('click', (_) => this.markerClick.emit(model));
    return marker;
  }

  setMapView(
    latitude: number,
    longitude: number,
    zoom: number
  ) {
    this.map.setView(new L.LatLng(latitude, longitude), zoom);
  }
}
