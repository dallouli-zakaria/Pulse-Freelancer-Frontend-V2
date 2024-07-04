import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrl: './contract-edit.component.css'
})
export class ContractEditComponent {
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
}
