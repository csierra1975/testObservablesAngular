import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit{

  @Output() departmentSelected = new EventEmitter<string>();

  departments: string[] = [];

  constructor(private comunicationService: ComunicationService) {}

  ngOnInit() {
    this.comunicationService.departaments$().subscribe(departments => {
      this.departments = departments;
    });
  }

  onSelectDepartment(event: any) {
    const selectedDepartment = event.target.value;

    if (selectedDepartment) {
        this.departmentSelected.emit(selectedDepartment);
      }
  }
}
