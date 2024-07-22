import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, shareReplay } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  Skill:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Skill[]>=new BehaviorSubject<Skill[]>([])
   constructor(private http:HttpClient) { }
   
   public count(){
     this.Skill=this.http.get(`${this.url}/SkillCount`);
     return this.Skill
   }
   public index(){
     this.Skill=this.http.get(`${this.url}/${Constant.SkillS}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>this.subject.next(data),
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation') 
    }).add(console.log('suject permession'))
   }
    
   get skillData():Observable<Skill[]>{
    return this.subject.asObservable()
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
