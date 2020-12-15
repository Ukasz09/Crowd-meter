import { Component, Input, OnInit } from '@angular/core';
import { MarkerSchema } from 'src/app/data/schema/marker';
import { MarkersService } from 'src/app/data/service/markers.service';
import { CustomProgressbarComponent } from 'src/app/shared/components/custom-progressbar/custom-progressbar.component';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.scss'],
})
export class MarkerDetailsComponent implements OnInit {
  @Input() markerId: string;
  lastRefreshDate: Date;
  dataIsReady = false;
  marker: MarkerSchema;

  constructor(private markersService: MarkersService) {}

  ngOnInit(): void {
    this.fetchMarkerDetails();
  }

  private fetchMarkerDetails() {
    this.markersService.getMarker(this.markerId).subscribe(
      (marker) => {
        this.marker = marker;
        this.dataIsReady = true;
        this.lastRefreshDate = new Date(Date.now());
      },
      (error) => {
        //TODO:
      }
    );
  }

  get actualCrowdLevelEmoji(): string {
    let perc = this.crowdednessPercent;
    if (perc <= CustomProgressbarComponent.LOW_CROWDING_TRESHOLD)
      return 'sentiment_very_satisfied';
    if (perc <= CustomProgressbarComponent.MEDIOCRE_CROWDING_TRESHOLD)
      return 'sentiment_satisfied';
    if (perc <= CustomProgressbarComponent.HIGH_CROWDING_TRESHOLD)
      return 'sentiment_dissatisfied';
    return 'sentiment_very_dissatisfied';
  }

  get actualCrowdLevelText(): string {
    let perc = this.crowdednessPercent;
    if (perc <= CustomProgressbarComponent.LOW_CROWDING_TRESHOLD) return 'low';
    if (perc <= CustomProgressbarComponent.MEDIOCRE_CROWDING_TRESHOLD)
      return 'mediocre';
    if (perc <= CustomProgressbarComponent.HIGH_CROWDING_TRESHOLD)
      return 'high';
    return 'very high';
  }

  get crowdednessPercent(): number {
    return (this.marker.numberOfPeoples / this.marker.numberOfFreeSpace) * 100;
  }

  get actualCrowdColorClass(): string {
    let perc = this.crowdednessPercent;
    if (perc <= CustomProgressbarComponent.LOW_CROWDING_TRESHOLD)
      return 'text-success';
    if (perc <= CustomProgressbarComponent.MEDIOCRE_CROWDING_TRESHOLD)
      return 'text-info';
    if (perc <= CustomProgressbarComponent.HIGH_CROWDING_TRESHOLD)
      return 'text-warning';
    return 'text-danger';
  }

  get numberOfActualFreeSpaces(): number {
    return this.marker.numberOfFreeSpace - this.marker.numberOfPeoples;
  }

  get lastRefreshDateText(): string {
    return (
      this.lastRefreshDate.getDate() +
      '.' +
      this.lastRefreshDate.getMonth() +
      '.' +
      this.lastRefreshDate.getFullYear() +
      ', ' +
      this.lastRefreshDate.getHours() +
      ':' +
      this.lastRefreshDate.getMinutes() +
      '.' +
      this.lastRefreshDate.getSeconds()
    );
  }

  get openHoursEntries(): [string, string][] {
    return Object.entries(this.marker.openingHours);
  }
}
