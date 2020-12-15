import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { HomeComponent } from './page/home/home.component';
import { MapComponent } from './page/home/map/map.component';
import { MarkerDetailsComponent } from './page/home/marker-details/marker-details.component';
import { CustomProgressbarComponent } from './shared/components/custom-progressbar/custom-progressbar.component';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DataLoadingSpinnerComponent } from './shared/components/data-loading-spinner/data-loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    NavbarComponent,
    MarkerDetailsComponent,
    CustomProgressbarComponent,
    DataLoadingSpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
