import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})

export class RoleDetailsComponent {

  @Output() closeModal = new EventEmitter<void>();
  

  close(): void {
    this.closeModal.emit();
  }
}
