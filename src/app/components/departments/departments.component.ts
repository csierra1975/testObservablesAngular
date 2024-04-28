import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicationService } from '../../services/comunication.service';
import { BehaviorSubject,  map, tap } from 'rxjs';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {

  @Output() departmentSelected = new EventEmitter<string>();

  constructor(private comunicationService: ComunicationService) {}

  vm$ = this.comunicationService.departaments$();

  onSelectDepartment(event: any) {
    const selectedDepartment = event.target.value;

    if (selectedDepartment) {
        this.departmentSelected.emit(selectedDepartment);
      }
  }
}
