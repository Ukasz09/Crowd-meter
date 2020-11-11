import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './view/map/map.component';
import { HomeComponent } from './view/home/home.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { MarkerDetailsComponent } from './view/marker-details/marker-details.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CustomProgressbarComponent } from './view/marker-details/custom-progressbar/custom-progressbar.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    NavbarComponent,
    MarkerDetailsComponent,
    CustomProgressbarComponent,
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
    ProgressbarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
