import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ComunicationService } from '../../services/comunication.service';
import { FilterValueComponent } from "../filter-value/filter-value.component";
import { CommonModule } from '@angular/common';
import { filter } from '../../models/filter';
@Component({
    selector: 'app-product-filter',
    standalone: true,
    templateUrl: './product-filter.component.html',
    styleUrl: './product-filter.component.css',
    imports: [FormsModule, FilterValueComponent, CommonModule]
})
export class ProductFilterComponent {

  nameFilter: string = '';
  priceFilterFrom: number | null = null;
  priceFilterTo: number | null = null;

  filterValues: string[] = [];

  constructor(private comunicationService: ComunicationService) {
    this.comunicationService.setFilters$.subscribe(filters => {
      this.setFilters(filters);
    })
  }

  applyFilter() {
    const filters = {name: this.nameFilter, priceFrom: this.priceFilterFrom, priceTo: this.priceFilterTo};

    this.setFilters(filters);
    this.comunicationService.filterApplied$.next({...filters});
  }

  deleteFilterValue(value:string){
    this.filterValues = this.filterValues.filter(cadena => cadena !== value);

    if (value.indexOf('Name') !== -1) {
      this.nameFilter = '';
    }

    if (value.indexOf('Price product from') !== -1) {
      this.priceFilterFrom = null;
    }

    if (value.indexOf('Price product to') !== -1) {
      this.priceFilterTo = null;
    }

    this.comunicationService.filterApplied$.next({name: this.nameFilter, priceFrom: this.priceFilterFrom, priceTo: this.priceFilterTo});
  }

  private setFilters(filters: filter){

    this.filterValues = [];
    this.nameFilter = '';
    this.priceFilterFrom = null;
    this.priceFilterTo = null;

    if (filters.name && filters.name.length > 0 ) {
      this.nameFilter = filters.name;
      this.filterValues.push(`Name product: ${this.nameFilter} `)
    }

    if (filters.priceFrom! > 0 ) {
      this.priceFilterFrom = filters.priceFrom;
      this.filterValues.push(`Price product from: ${this.priceFilterFrom} `)
    }

    if (filters.priceTo! > 0 ) {
      this.priceFilterTo = filters.priceTo;
      this.filterValues.push(`Price product to: ${this.priceFilterTo} `)
    }
  }

}
