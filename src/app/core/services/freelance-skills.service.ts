import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillWithProgress } from '../models/skillWithProgress';

@Injectable({
  providedIn: 'root'
})
export class FreelanceSkillsService {
  Skill:any
  url=Constant.API_ENDPOINT
   constructor(private http:HttpClient) { }


   store(data:any):Observable<SkillWithProgress>{
    this.Skill=this.http.post(`${this.url}/freelancer_skills`,data);
    return this.Skill
   }
}
