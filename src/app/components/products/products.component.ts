import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicationService } from '../../services/comunication.service';
import { map, combineLatest, Observable, BehaviorSubject  } from 'rxjs';
import { Product } from '../../models/product';

interface ViewModel  {
  nameDepartment: string,
  products: Product[],
  total: number
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  filterApplied$ = this.comunicationService.filterApplied$;

  departmentChanged$ = this.comunicationService.departmentsChanged$;

  refresh$ = new BehaviorSubject<void>(undefined);

  currentDepartment: string = '';

  vm$: Observable<ViewModel> = combineLatest([this.refresh$, this.filterApplied$])
  .pipe(
    map(() => {
      const _products = this.comunicationService.getProductsByDepartment(this.currentDepartment ?? null);

      return {nameDepartment: this.currentDepartment, products: _products, total: _products.length }
    }),
  );

  constructor(private comunicationService: ComunicationService) {

    this.comunicationService.departmentsChanged$.subscribe( result => {
      this.currentDepartment = result;
      this.setFilters();
      this.refresh$.next();
    });
  }

  private setFilters() {
    this.comunicationService.setFilters({
      name: '',
      priceFrom: null,
      priceTo: 200
    });
  }
}
