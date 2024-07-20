import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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
     this.Skill=this.http.get(`${this.url}/freelancers/${id}/${Constant.SkillS}`);
     return this.Skill;
   }


       // Get all skills
       getSkills(): Observable<any> {
        return this.http.get<any>(`${this.url}/skills`)
          .pipe(catchError(this.handleError));
      }
    
      // Get a specific skill by ID
      getSkillById(id: number): Observable<any> {
        return this.http.get<any>(`${this.url}/skills/${id}`)
          .pipe(catchError(this.handleError));
      }

          // Handle errors
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      throw error; // Rethrow error to be handled by the caller
    }

    updateFreelancerSkills(freelancerId: number, skills:any): Observable<any> {
      return this.http.put(`${this.url}/freelancers/${freelancerId}/skills`, skills );
  }
  
  



   
}
