import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MarkerModel } from 'src/app/model/marker';
import { PlaceCategory } from 'src/app/model/place-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  chosenMarker: MarkerModel;
  categories: PlaceCategory[];

  constructor(
    private modalService: BsModalService,
    private markersService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  markerClickAction(markerModel: MarkerModel, template: TemplateRef<any>) {
    this.chosenMarker = markerModel;
    this.openModal(template);
  }

  private fetchCategories() {
    this.markersService
      .getCategories()
      .subscribe((data: PlaceCategory[]) => (this.categories = data));
  }
}
