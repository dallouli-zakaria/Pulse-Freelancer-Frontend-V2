import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  showadd=false
  show=false
  
  onAdd(): void {
    this.show = true;
      this.showadd = true;
  }
    onCloseModal(): void {
      this.show = false;
      this.showadd = false;
     
    }
}
