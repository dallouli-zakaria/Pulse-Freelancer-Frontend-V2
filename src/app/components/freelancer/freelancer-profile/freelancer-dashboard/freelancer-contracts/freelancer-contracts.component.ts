import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-contracts',
  templateUrl: './freelancer-contracts.component.html',
  styleUrl: './freelancer-contracts.component.css'
})
export class FreelancerContractsComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
