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
      id: 0, 
      freelancer_id: 0,
      skill_id: 0,
      title: skill,
      level: 20
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
