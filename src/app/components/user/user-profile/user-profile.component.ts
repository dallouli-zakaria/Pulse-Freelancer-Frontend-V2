import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    console.log('closed');
    
  }

  items = [
    'Mes informations',
    'Mes Offres',
    'Mes contracts',
    'Mes abonnements',
  
  ];
  urls=[
    'info',
    'offers'
  ]
  
  selectedItemIndex: number | null = null;

  selectItem(index: number): void {
    this.selectedItemIndex = index;
  }




  
  //skeleton loading
  isLoading = true;
  data: any[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // Simulate an API call
    setTimeout(() => {
      this.data = [
        { title: 'Item 1', description: 'Description 1' },
        { title: 'Item 2', description: 'Description 2' }
      ];
      this.isLoading = false;
    }, 3000);
  }
}
