import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrl: './contract-delete.component.css'
})
export class ContractDeleteComponent {
  
 @Output() closeModal = new EventEmitter<void>();
 close(): void {
   this.closeModal.emit();
 }
}
