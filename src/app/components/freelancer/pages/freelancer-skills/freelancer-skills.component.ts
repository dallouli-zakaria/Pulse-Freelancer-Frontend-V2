import { Component } from '@angular/core';
import { SkillWithProgress } from '../../../../core/models/skillWithProgress';
import { SkillService } from '../../../../core/services/skill.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Skill } from '../../../../core/models/skill';

@Component({
  selector: 'app-freelancer-skills',
  templateUrl: './freelancer-skills.component.html',
  styleUrl: './freelancer-skills.component.css'
})
export class FreelancerSkillsComponent {
  submittedSkills: SkillWithProgress[] = [];
  displayEdit = "none";
  freelancerId: number = this.authService.parseID();
  freelancerSkillsData:Skill[]=[]
  constructor(private skillService:SkillService,private  authService:AuthService){}
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

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.index()
 }
  public index(){
    this.skillService.showbyfreelancerid(this.freelancerId).subscribe({
      next:(data:any)=>{
        this.freelancerSkillsData=data
      
        
      },
      error:(error:any)=>{
        console.log(error) 
      }
    })
  }








  displayAdd = "none";

  openModalAdd() {
      this.displayAdd = "block";
    }
  onCloseHandledAdd() {
    this.displayAdd = "none";
  }

  

 

  openModalEdit() {
      this.displayEdit = "block";
    }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }

   
}
