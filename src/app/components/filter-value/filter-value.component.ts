import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-value',
  standalone: true,
  imports: [],
  templateUrl: './filter-value.component.html',
  styleUrl: './filter-value.component.css'
})
export class FilterValueComponent {

  @Input() nameFilter: string ='';
  @Output() closeClicked = new EventEmitter<string>();

  emitCloseEvent() {
    this.closeClicked.emit(this.nameFilter);
  }
}
