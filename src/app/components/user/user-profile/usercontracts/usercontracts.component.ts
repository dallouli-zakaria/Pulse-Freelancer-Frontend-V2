import { Component } from '@angular/core';

@Component({
  selector: 'app-usercontracts',
  templateUrl: './usercontracts.component.html',
  styleUrl: './usercontracts.component.css'
})
export class UsercontractsComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
