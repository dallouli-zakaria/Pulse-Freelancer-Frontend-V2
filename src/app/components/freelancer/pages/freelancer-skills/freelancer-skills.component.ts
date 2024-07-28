import { Component, OnInit } from '@angular/core';
import { SkillWithProgress } from '../../../../core/models/skillWithProgress';
import { SkillService } from '../../../../core/services/skill.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Skill } from '../../../../core/models/skill';
import { FreelanceSkillsService } from '../../../../core/services/freelance-skills.service';

@Component({
  selector: 'app-freelancer-skills',
  templateUrl: './freelancer-skills.component.html',
  styleUrls: ['./freelancer-skills.component.css']
})
export class FreelancerSkillsComponent implements OnInit {
  submittedSkills: SkillWithProgress[] = [];
  displayEdit = "none";
  freelancerId: number = this.authService.parseID();
  freelancerSkillsData: Skill[] = [];

  constructor(
    private skillService: SkillService,
    private authService: AuthService,
    private freelancerskillservice: FreelanceSkillsService
  ) {}

  ngOnInit(): void {
    this.index();
  }

  onSkillsSubmitted(skills: string[]): void {
   
    const newSkills = skills.map(skill => ({
      id: 0,
      freelancer_id: 0,
      skill_id: 0,
      title: skill,
      level: 20
    }));
    this.submittedSkills = [...this.submittedSkills, ...newSkills];


    this.skillService.store(newSkills).subscribe({
      next: () => {
        this.index();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    
  }

  public index(): void {
    this.skillService.showbyfreelancerid(this.freelancerId).subscribe({
      next: (data: any) => {
        this.freelancerSkillsData = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  removeSkill(freelancerId: number, skillId: number): void {
    this.freelancerskillservice.deleteSkillbyfreelancerId(freelancerId, skillId).subscribe({
      next: () => {
        this.index();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
