import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../../core/services/skill.service';
import { Skill } from '../../../../core/models/skill';

@Component({
  selector: 'app-skills-table',
  templateUrl: './skills-table.component.html',
  styleUrl: './skills-table.component.css'
})
export class SkillsTableComponent implements OnInit{
  showedelete = false;
  skills:Skill[]=[];

  constructor(private skillservice:SkillService){}

  ngOnInit(): void {
    this.loadSkills();
  }

//load all skills
loadSkills(): void {
  this.skillservice.index();
  this.skillservice.skillData.subscribe((res) => {
    this.skills = res;
  });
}


ondeleted(id:number, user: any): void {

}

}
