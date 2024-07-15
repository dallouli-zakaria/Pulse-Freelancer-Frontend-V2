import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  Skill:any
  url=Constant.API_ENDPOINT
   constructor(private http:HttpClient) { }
   
   public count(){
     this.Skill=this.http.get(`${this.url}/SkillCount`);
     return this.Skill
   }
   public index():Observable<Skill[]>{
     this.Skill=this.http.get(`${this.url}/${Constant.SkillS}`);
     return this.Skill
   }
 
   public store(data:any):Observable<Skill>{
   this.Skill=this.http.post(`${this.url}/${Constant.SkillS}`,data);
   return this.Skill
   }
 
   public update(id: any, value: any):Observable<Skill>{
     this.Skill=this.http.put(`${this.url}/${Constant.SkillS}`,id);
     return this.Skill
   }
    
   public delete(id:number):Observable<Skill>{
     this.Skill=this.http.delete(`${this.url}/${Constant.SkillS}/${id}`);
     return this.Skill
   }
   public show(id:any):Observable<Skill>{
     this.Skill=this.http.get(`${this.url}/${Constant.SkillS}/${id}`);
     return this.Skill
   }
 
 
   public showbyfreelancerid(id:any):Observable<Skill>{
     this.Skill=this.http.get(`${this.url}/${Constant.SkillS}/freelancer/${id}`);
     return this.Skill;
   }


   
}
