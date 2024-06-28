import { Component } from '@angular/core';

@Component({
  selector: 'app-usersubscriptions',
  templateUrl: './usersubscriptions.component.html',
  styleUrl: './usersubscriptions.component.css'
})
export class UsersubscriptionsComponent {




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
