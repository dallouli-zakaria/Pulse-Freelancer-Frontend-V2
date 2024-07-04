import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrl: './users-delete.component.css'
})
export class UsersDeleteComponent {

  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
}
