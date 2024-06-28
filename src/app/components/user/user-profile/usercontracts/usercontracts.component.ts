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



  constructor(){
    this.fetchData();
  }


    //skeleton loading
    isLoading = true;
    data: any[] = [];
  

  
    fetchData() {
      // Simulate an API call
      setTimeout(() => {
        this.data = [
          { title: 'Item 1', description: 'Description 1' },
          { title: 'Item 2', description: 'Description 2' }
        ];
        this.isLoading = false;
      }, 1000);
    }
}
