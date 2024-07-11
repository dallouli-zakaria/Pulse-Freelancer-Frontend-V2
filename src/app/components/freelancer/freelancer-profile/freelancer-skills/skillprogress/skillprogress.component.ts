import { Component, Input } from '@angular/core';
import { SkillWithProgress } from '../../../../../core/models/skillWithProgress';

@Component({
  selector: 'app-skillprogress',
  templateUrl: './skillprogress.component.html',
  styleUrl: './skillprogress.component.css'
})
export class SkillprogressComponent {
  @Input() submittedSkills: SkillWithProgress[] = [];

  increaseProgress(skill: SkillWithProgress): void {
    if (skill.progress < 100) {
      skill.progress += 10;
      if (skill.progress > 100) {
        skill.progress = 100;
      }
    }
  }

  decreaseProgress(skill: SkillWithProgress): void {
    if (skill.progress > 0) {
      skill.progress -= 10;
      if (skill.progress < 0) {
        skill.progress = 0;
      }
    }
  }
}
