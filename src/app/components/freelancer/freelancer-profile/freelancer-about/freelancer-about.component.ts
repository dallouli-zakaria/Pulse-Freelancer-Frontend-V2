import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-about',
  templateUrl: './freelancer-about.component.html',
  styleUrl: './freelancer-about.component.css'
})
export class FreelancerAboutComponent {
  displayEdit = "none";

  openModalEdit() {
      this.displayEdit = "block";
    }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }
}
