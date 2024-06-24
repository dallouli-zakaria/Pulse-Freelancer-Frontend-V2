import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-skills',
  templateUrl: './freelancer-skills.component.html',
  styleUrl: './freelancer-skills.component.css'
})
export class FreelancerSkillsComponent {

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
