import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrl: './contract-add.component.css'
})
export class ContractAddComponent {
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
}
