import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MarkerSchema } from 'src/app/data/schema/marker.schema';
import { MarkersService } from 'src/app/data/service/markers.service';
import { CustomProgressbarComponent } from 'src/app/shared/components/custom-progressbar/custom-progressbar.component';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-marker-details',
  templateUrl: './marker-details.component.html',
  styleUrls: ['./marker-details.component.scss'],
})
export class MarkerDetailsComponent implements OnInit, OnDestroy {
  private readonly updateDataPeriod = 3000;

  @Input() markerId: string;
  lastRefreshDate: Date;
  dataIsReady = false;
  marker: MarkerSchema;
  dataFetchingTimerSubscription: Subscription;
  openHoursKeys = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  constructor(private markersService: MarkersService) {}

  ngOnInit(): void {
    this.fetchMarkerDetailsWithPolling();
  }

  ngOnDestroy(): void {
    if (this.dataFetchingTimerSubscription !== undefined) {
      this.dataFetchingTimerSubscription.unsubscribe();
    }
  }

  private fetchMarkerDetailsWithPolling(): void {
    const source = timer(0, this.updateDataPeriod);
    this.dataFetchingTimerSubscription = source.subscribe((_) => {
      this.fetchMarkerDetails();
    });
  }

  private fetchMarkerDetails(): void {
    this.markersService.getMarker(this.markerId).subscribe(
      (marker) => {
        this.marker = marker;
        this.dataIsReady = true;
        this.lastRefreshDate = new Date(Date.now());
      },
      (err) => {
        throw err;
      }
    );
  }

  get actualCrowdLevelEmoji(): string {
    const percent = this.crowdednessPercent;
    if (percent <= CustomProgressbarComponent.LOW_CROWDING_THRESHOLD) {
      return 'sentiment_very_satisfied';
    }
    if (percent <= CustomProgressbarComponent.MEDIOCRE_CROWDING_THRESHOLD) {
      return 'sentiment_satisfied';
    }
    if (percent <= CustomProgressbarComponent.HIGH_CROWDING_THRESHOLD) {
      return 'sentiment_dissatisfied';
    }
    return 'sentiment_very_dissatisfied';
  }

  get actualCrowdLevelText(): string {
    const percent = this.crowdednessPercent;
    if (percent <= CustomProgressbarComponent.LOW_CROWDING_THRESHOLD) {
      return 'low';
    }
    if (percent <= CustomProgressbarComponent.MEDIOCRE_CROWDING_THRESHOLD) {
      return 'mediocre';
    }
    if (percent <= CustomProgressbarComponent.HIGH_CROWDING_THRESHOLD) {
      return 'high';
    }
    return 'very high';
  }

  get crowdednessPercent(): number {
    return (this.marker.numberOfPeoples / this.marker.numberOfFreeSpace) * 100;
  }

  get actualCrowdColorClass(): string {
    const percent = this.crowdednessPercent;
    if (percent <= CustomProgressbarComponent.LOW_CROWDING_THRESHOLD) {
      return 'text-success';
    }
    if (percent <= CustomProgressbarComponent.MEDIOCRE_CROWDING_THRESHOLD) {
      return 'text-info';
    }
    if (percent <= CustomProgressbarComponent.HIGH_CROWDING_THRESHOLD) {
      return 'text-warning';
    }
    return 'text-danger';
  }

  get numberOfActualFreeSpaces(): number {
    const spaces = this.marker.numberOfFreeSpace - this.marker.numberOfPeoples;
    return spaces > 0 ? spaces : 0;
  }

  get lastRefreshDateText(): string {
    return (
      this.lastRefreshDate.getDate() +
      '.' +
      (this.lastRefreshDate.getMonth() + 1) +
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
}
