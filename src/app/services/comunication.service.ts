import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DepartmentsWithProducts } from '../models/departmentsWithProducts ';
import { Product } from '../models/product';
import { filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private departmentsWithProducts: DepartmentsWithProducts = {
    'Electrónica': [
      { id: 1, name: 'Smartphone', price: 599.99, details: 'Un teléfono inteligente con pantalla táctil y muchas características.' },
      { id: 2, name: 'Laptop', price: 1299.99, details: 'Una computadora portátil potente y ligera.' },
      { id: 3, name: 'Auriculares inalámbricos', price: 149.99, details: 'Auriculares que se conectan de forma inalámbrica a tus dispositivos.' },
      { id: 4, name: 'Smart TV', price: 799.99, details: 'Televisor inteligente con resolución 4K y acceso a aplicaciones.' },
      { id: 5, name: 'Tableta', price: 299.99, details: 'Tableta con pantalla HD y capacidad de almacenamiento ampliable.' }
    ],
    'Ropa': [
      { id: 6, name: 'Camisa de algodón', price: 39.99, details: 'Una camisa de manga larga hecha de suave algodón.' },
      { id: 7, name: 'Pantalones vaqueros', price: 49.99, details: 'Pantalones duraderos y cómodos para el día a día.' },
      { id: 8, name: 'Zapatillas deportivas', price: 79.99, details: 'Zapatillas cómodas y elegantes para correr o caminar.' },
      { id: 9, name: 'Chaqueta impermeable', price: 99.99, details: 'Chaqueta resistente al agua y al viento para actividades al aire libre.' },
      { id: 10, name: 'Vestido de fiesta', price: 129.99, details: 'Vestido elegante y sofisticado para ocasiones especiales.' }
    ],
    'Hogar': [
      { id: 11, name: 'Sofá seccional', price: 899.99, details: 'Un sofá amplio y cómodo con varias secciones.' },
      { id: 12, name: 'Mesa de centro', price: 149.99, details: 'Una mesa de centro moderna y elegante para tu sala de estar.' },
      { id: 13, name: 'Lámpara de pie', price: 69.99, details: 'Una lámpara de pie ajustable para iluminar cualquier habitación.' },
      { id: 14, name: 'Juego de sábanas', price: 29.99, details: 'Juego de sábanas de algodón suave y transpirable.' },
      { id: 15, name: 'Set de utensilios de cocina', price: 49.99, details: 'Set completo de utensilios de cocina de acero inoxidable.' }
    ],
    'Deportes': [
      { id: 16, name: 'Balón de fútbol', price: 29.99, details: 'Balón oficial para jugar al fútbol en el campo o en la calle.' },
      { id: 17, name: 'Raqueta de tenis', price: 89.99, details: 'Raqueta ligera y resistente para jugar al tenis en cualquier superficie.' },
      { id: 18, name: 'Cinta para correr', price: 999.99, details: 'Cinta de correr plegable con diferentes programas de entrenamiento.' },
      { id: 19, name: 'Pesas ajustables', price: 149.99, details: 'Set de pesas ajustables para entrenamiento de fuerza en casa.' },
      { id: 20, name: 'Bicicleta de montaña', price: 699.99, details: 'Bicicleta robusta y duradera para explorar senderos de montaña.' }
    ],
    'Juguetes': [
      { id: 21, name: 'Set de bloques de construcción', price: 49.99, details: 'Set de bloques de construcción para niños con muchas piezas.' },
      { id: 22, name: 'Muñeca articulada', price: 19.99, details: 'Muñeca articulada con ropa intercambiable y accesorios.' },
      { id: 23, name: 'Coche teledirigido', price: 39.99, details: 'Coche teledirigido con control remoto para niños y adultos.' },
      { id: 24, name: 'Puzzle de 1000 piezas', price: 29.99, details: 'Puzzle desafiante con 1000 piezas para horas de diversión.' },
      { id: 25, name: 'Juego de té de juguete', price: 14.99, details: 'Juego de té de juguete con tazas, platillos y jarra.' }
    ]
  }

  private departments: string[] = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes'];
  private departmentsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.departments);

  public departmentsChanged$: BehaviorSubject<string> = new BehaviorSubject<string>('Electrónica');
  public filterApplied$: BehaviorSubject<filter> = new BehaviorSubject<filter>({name: '', priceFrom: null, priceTo: null});

  public setFilters$: Subject<filter> = new Subject<filter>();

  private filters: filter = {name: '', priceFrom: null, priceTo: null} ;

  constructor() {
    this.filterApplied$.subscribe(filters =>  this.filters = {...filters});
   }

  departaments$(): Observable<string[]> {
    return this.departmentsSubject.asObservable();
  }

  departamentChanged(department: string) {
    this.departmentsChanged$.next(department);
  }

  setFilters(filters: filter) {
    this.filters = {...filters}
    this.setFilters$.next(filters);
  }

  getProductsByDepartment(department: (string | null) = null): Product[] {

    const products = this.departmentsWithProducts[department ?? 'Electrónica'];

    let filteredProducts = products.filter(product => {
      // Verificar si el precio del producto es igual o mayor que el precio mínimo
      let priceCondition = product.price >= (this.filters.priceFrom ?? 0) && product.price <= (this.filters.priceTo ?? 10000000);

      // Verificar si el nombre del producto contiene la cadena de búsqueda
      let searchStringCondition = product.name.toLowerCase().includes(this.filters.name.toLowerCase());

      // Devolver true si ambas condiciones se cumplen
      return priceCondition && searchStringCondition;
    });


    return  filteredProducts || [];
  }
}
