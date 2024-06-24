import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-sideprofile',
  templateUrl: './freelancer-sideprofile.component.html',
  styleUrl: './freelancer-sideprofile.component.css'
})
export class FreelancerSideprofileComponent {
  displayEdit = "none";

  openModalEdit() {
      this.displayEdit = "block";
    }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }
}
