import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-experience',
  templateUrl: './freelancer-experience.component.html',
  styleUrl: './freelancer-experience.component.css'
})
export class FreelancerExperienceComponent {
  displayAdd = "none";

  openModalAdd() {
      this.displayAdd = "block";
    }
  onCloseHandledAdd() {
    this.displayAdd = "none";
  }



  displayEdit = "none";

  openModalEdit() {
      this.displayEdit = "block";
    }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }
}
