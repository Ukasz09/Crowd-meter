import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MarkerModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { MarkersService } from 'src/app/services/markers.service';

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

  @Output() markerClick: EventEmitter<any> = new EventEmitter();

  map: L.Map;
  displayedMarkers: MarkerModel[] = [];
  markersLayer: L.LayerGroup<L.Marker>;

  constructor(private markersService: MarkersService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.markersLayer = L.layerGroup();
    this.map = L.map('map-container', {
      center: this.STARTED_LATLNG,
      zoom: 12,
    });
    this.initMapTiles();
    this.fetchMarkers();
  }

  private initMapTiles() {
    let tiles = L.tileLayer(this.TILE_PROVIDER.urlTemplate, {
      maxZoom: 19,
      attribution: this.TILE_PROVIDER.attribution,
    });
    tiles.addTo(this.map);
  }

  private fetchMarkers() {
    this.markersService.getMarkers().subscribe((data: MarkerModel[]) => {
      this.displayedMarkers = data;
      this.updateMarkers();
    });
  }

  private updateMarkers() {
    this.markersLayer.clearLayers();
    let markers = [];
    for (let model of this.displayedMarkers)
      markers.push(this.getMarker(model));
    this.markersLayer = L.layerGroup(markers);
    this.markersLayer.addTo(this.map);
  }

  private getMarker(model: MarkerModel) {
    let marker = L.marker([model.latitude, model.longitude]);
    marker.on('click', (_) => this.markerClick.emit(model));
    return marker;
  }
}
