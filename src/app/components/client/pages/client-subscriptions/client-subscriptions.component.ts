import { Component } from '@angular/core';

@Component({
  selector: 'app-client-subscriptions',
  templateUrl: './client-subscriptions.component.html',
  styleUrl: './client-subscriptions.component.css'
})
export class ClientSubscriptionsComponent {

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
