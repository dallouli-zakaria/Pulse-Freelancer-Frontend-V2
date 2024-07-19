import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillWithProgress } from '../../../core/models/skillWithProgress';
import { AuthService } from '../../../core/services/auth.service';
import { FreelanceSkillsService } from '../../../core/services/freelance-skills.service';

@Component({
  selector: 'app-skillprogress',
  templateUrl: './skillprogress.component.html',
  styleUrl: './skillprogress.component.css'
})
export class SkillprogressComponent {
  @Input() submittedSkills: SkillWithProgress[] = [];
  form: FormGroup;
  skillWithProgress!:SkillWithProgress;
  freelancerId:number=this.authservice.parseID();


  constructor(private freelancerskill:FreelanceSkillsService,private fb: FormBuilder, private authservice:AuthService){
    this.form = this.fb.group({
      title: ['', Validators.required],
      level: ['', Validators.required],
      skill_id: ['', Validators.required],
      freelancer_id: [this.freelancerId]
    });
  }

  increaseProgress(skill: SkillWithProgress): void {
    if (skill.level < 100) {
      skill.level += 20;
      if (skill.level > 100) {
        skill.level = 100;
      }
    }
  }

  decreaseProgress(skill: SkillWithProgress): void {
    if (skill.level > 0) {
      skill.level -= 20;
      if (skill.level < 0) {
        skill.level = 0;
      }
    }
  }


  addSkills(){
    // this.freelancerskill.store().subscribe(()=>{
    //   res=this.skillWithProgress;
    // })
  }
}
