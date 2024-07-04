import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrl: './freelancer.component.css'
})
export class FreelancerComponent {

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
