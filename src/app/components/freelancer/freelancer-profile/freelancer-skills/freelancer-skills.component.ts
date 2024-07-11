import { Component } from '@angular/core';
import { SkillWithProgress } from '../../../../core/models/skillWithProgress';

@Component({
  selector: 'app-freelancer-skills',
  templateUrl: './freelancer-skills.component.html',
  styleUrl: './freelancer-skills.component.css'
})
export class FreelancerSkillsComponent {


  submittedSkills: SkillWithProgress[] = [];

  onSkillsSubmitted(skills: string[]): void {
    const newSkills = skills.map(skill => ({
      name: skill,
      progress: 0
    }));
    this.submittedSkills = [...this.submittedSkills, ...newSkills];
  }

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
