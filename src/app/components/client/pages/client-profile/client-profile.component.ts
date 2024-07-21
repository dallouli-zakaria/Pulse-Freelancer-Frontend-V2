import { Component } from '@angular/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {
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


  


  ngOnInit() {
 
  }

 
}
