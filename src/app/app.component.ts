import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentsComponent } from "./components/departments/departments.component";
import { ComunicationService } from './services/comunication.service';
import { ProductsComponent } from "./components/products/products.component";
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DepartmentsComponent, ProductsComponent, ProductFilterComponent]
})
export class AppComponent {
  title = 'Test Observables';

  constructor(private comunicationService: ComunicationService) {}

  departmentHasChanged(departament:string){
    this.comunicationService.departamentChanged(departament)
  }
}
