import { Component, Input } from '@angular/core';
import { SkillWithProgress } from '../../../../../core/models/skillWithProgress';
import { FreelanceSkillsService } from '../../../../../core/services/freelance-skills.service';

@Component({
  selector: 'app-skillprogress',
  templateUrl: './skillprogress.component.html',
  styleUrl: './skillprogress.component.css'
})
export class SkillprogressComponent {

  @Input() submittedSkills: SkillWithProgress[] = [];

  constructor(private freelancerskill:FreelanceSkillsService){}

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
}
