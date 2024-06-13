import { Component } from '@angular/core';

@Component({
  selector: 'app-user-contract',
  templateUrl: './user-contract.component.html',
  styleUrl: './user-contract.component.css'
})
export class UserContractComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
