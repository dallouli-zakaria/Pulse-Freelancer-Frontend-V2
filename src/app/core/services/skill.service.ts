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
    // Get the count of skills
    public count() {
      this.Skill = this.http.get(`${this.url}/SkillCount`);
      return this.Skill;
    }
  
    // Get all skills
    public index() {
      this.Skill = this.http.get(`${this.url}/${Constant.SkillS}`).pipe(shareReplay(1)).subscribe({
        next: (data: any) => this.subject.next(data),  // Emit the fetched data through the BehaviorSubject
        error: (error) => console.log(error),  // Log any errors
        complete: () => console.log('end operation')  // Log when the operation completes
      }).add(console.log('subject permission'));
    }
  
    // Observable to allow other components to subscribe to the skill data
    get skillData(): Observable<Skill[]> {
      return this.subject.asObservable();
    }
  
    // Create a new skill
    public store(data: any): Observable<Skill> {
      // HTTP POST request to create a new skill
      this.Skill = this.http.post(`${this.url}/${Constant.SkillS}`, data);
      return this.Skill;
    }
  
    // Update a skill by ID
    public update(id: any, value: any): Observable<Skill> {
      // HTTP PUT request to update a skill
      this.Skill = this.http.put(`${this.url}/${Constant.SkillS}`, id);
      return this.Skill;
    }
  
    // Delete a skill by ID
    public delete(id: number): Observable<Skill> {
      // HTTP DELETE request to delete a skill
      this.Skill = this.http.delete(`${this.url}/${Constant.SkillS}/${id}`);
      return this.Skill;
    }
  
    // Get a skill by ID
    public show(id: any): Observable<Skill> {
      // HTTP GET request to fetch a skill by ID
      this.Skill = this.http.get(`${this.url}/${Constant.SkillS}/${id}`);
      return this.Skill;
    }
  
    // Get skills by freelancer ID
    public showbyfreelancerid(id: any): Observable<Skill> {
      // HTTP GET request to fetch skills by freelancer ID
      this.Skill = this.http.get(`${this.url}/freelancers/${id}/${Constant.SkillS}`);
      return this.Skill;
    }
  
    // Get skills by freelancer ID and update the BehaviorSubject
    public index2(id: any) {
      // HTTP GET request to fetch skills by freelancer ID
      this.Skill = this.http.get(`${this.url}/freelancers/${id}/${Constant.SkillS}`).pipe(shareReplay(1)).subscribe({
        next: (data: any) => this.subject.next(data),  // Emit the fetched data through the BehaviorSubject
        error: (error) => console.log(error),  // Log any errors
        complete: () => console.log('end operation')  // Log when the operation completes
      }).add(console.log('subject permission'));
    }
  
    // Observable to allow other components to subscribe to the skill data from index2
    get skillData2(): Observable<Skill[]> {
      return this.subject.asObservable();
    }
  
    // Get all skills
    getSkills(): Observable<any> {
      // HTTP GET request to fetch all skills
      return this.http.get<any>(`${this.url}/skills`).pipe(catchError(this.handleError));
    }
  
    // Get a specific skill by ID
    getSkillById(id: number): Observable<any> {
      // HTTP GET request to fetch a specific skill by ID
      return this.http.get<any>(`${this.url}/skills/${id}`).pipe(catchError(this.handleError));
    }
  
    // Handle errors
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);  // Log the error
      throw error;  // Rethrow error to be handled by the caller
    }
  
    // Update freelancer skills
    updateFreelancerSkills(freelancerId: number, skills: any): Observable<any> {
      // HTTP PUT request to update freelancer skills
      return this.http.put(`${this.url}/freelancers/${freelancerId}/skills`, skills);
    }
  



   
}
