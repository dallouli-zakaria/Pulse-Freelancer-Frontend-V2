import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {

  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();    
  }
}
