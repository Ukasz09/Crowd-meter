import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';
import { MarkerModel } from 'src/app/model/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private mapStartedLatLng: [number, number] = [51.107883, 17.038538];
  private tileProvider = {
    urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  };

  map: L.Map;

  @Output() markerClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.initMap();
    this.addMarker(
      new MarkerModel(
        '1',
        this.mapStartedLatLng[0],
        this.mapStartedLatLng[1],
        'Konska',
        '51a',
        'pub',
        'Sklep z Kotami'
      )
    );
  }

  private initMap() {
    this.map = L.map('map-container', {
      center: this.mapStartedLatLng,
      zoom: 15,
    });
    this.initMapTiles();
  }

  private initMapTiles() {
    let tiles = L.tileLayer(this.tileProvider.urlTemplate, {
      maxZoom: 19,
      attribution: this.tileProvider.attribution,
    });
    tiles.addTo(this.map);
  }

  private addMarker(model: MarkerModel) {
    var marker = L.marker([model.latitude, model.longitude]);
    marker.on('click', (_) => this.markerClick.emit(model));
    marker.addTo(this.map);
  }
}
