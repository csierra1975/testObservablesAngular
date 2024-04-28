# TestObservables

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

This Angular application allows users to filter a list of products based on their names and maximum price. Users can input the product name they are searching for and set a maximum price to filter the products accordingly. The app dynamically updates the product list as the user types in the search query or adjusts the maximum price.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Description

The application consists of several components and a service. The service communicates with each component through observables. The main component is a list of departments, which sends an event when it changes value. The app component then notifies the service that the department has changed. We do this to simulate a component that can be reused in various parts of the application. There is also the filter component that maintains "the state" of the filters (this should go in a state and not in the component to be shared globally). Once the filtering is done, it publishes to an observable so that the products component can search for products through the service.



