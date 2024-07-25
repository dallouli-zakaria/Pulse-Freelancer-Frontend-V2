import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, catchError, Observable, Observer, shareReplay } from 'rxjs';
import { Freelancer } from '../models/Freelancer';
import { PaginatedResponse } from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private freelancerData!: Freelancer;
  freelancer:any
  score!:any;
  url=Constant.API_ENDPOINT
  conuntUrl:string='freelancerCount'
  private readonly subjectBe:BehaviorSubject<Freelancer[]>=new BehaviorSubject<Freelancer[]>([])
  constructor(private http:HttpClient) { }


   public count(){
    this.freelancer=this.http.get(`${this.url}/${this.conuntUrl}`);
    return this.freelancer;
   }
    
   public index(){
    this.freelancer=this.http.get(`${this.url}/${Constant.FREELANCERS}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>{ this.subjectBe.next(data)},
      error:(error:any)=>console.log(error),
      complete:()=>console.log('end get data')  
    }).add(()=>console.log('freelancer subject') );
   
   }

   public verifiedfreelancer():Observable<Freelancer[]>{
    this.freelancer=this.http.get(`${this.url}/freelancer/verified`);
    return this.freelancer;
   }

   get getdata():Observable<Freelancer[]>{
   return this.subjectBe.asObservable();
   }

   fetchPaginatedFreelancers(page: number = 1): Observable<PaginatedResponse<Freelancer>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedResponse<Freelancer>>(`${this.url}/freelancerPagination`, { params });
  }



    public store(data:any):Observable<Freelancer>{
      this.freelancer=this.http.post(`${this.url}/${Constant.FREELANCERS}`,data);
      return this.freelancer
   }

   public update(id:any,data:Partial<Freelancer>):Observable<Freelancer[]>{
    this.freelancer=this.http.put<Freelancer>(`${this.url}/${Constant.FREELANCERS}/${id}`,data);
    return this.freelancer;
   }
   
   public delete(id:any):Observable<Freelancer>{
    this.freelancer=this.http.delete(`${this.url}/${Constant.FREELANCERS}/${id}`);
    return this.freelancer
   }

   register(
    data:any
  ): Observable<any> {

    // return this.http.post(this.API_URL + 'signup', {
    return this.http.post(`${this.url}/${Constant.FREELANCERS}`, data);
  }


  show(id:any):Observable<Freelancer>{
    this.freelancer=this.http.get(`${this.url}/${Constant.FREELANCERS}/${id}`);
    return this.freelancer;
  }

  updateFreelancerData(data: Freelancer) {
    this.freelancerData = data;
  }

  getFreelancerData(): Freelancer {
    return this.freelancerData;
  }


    // Add a new skill to a freelancer
    addSkillToFreelancer(freelancerId: number, skillData: any): Observable<any> {
      return this.http.post<any>(`${this.url}/freelancers/${freelancerId}/skills`, skillData)
        .pipe(catchError(this.handleError));
    }
  
    // Update a skill level for a freelancer
    updateSkillLevel(freelancerId: number, skillId: number, level: string): Observable<any> {
      return this.http.put<any>(`${this.url}/freelancers/${freelancerId}/skills/${skillId}`, { level })
        .pipe(catchError(this.handleError));
    }
  
    // Remove a skill from a freelancer
    removeSkillFromFreelancer(freelancerId: number, skillId: number): Observable<any> {
      return this.http.delete<any>(`${this.url}/freelancers/${freelancerId}/skills/${skillId}`)
        .pipe(catchError(this.handleError));
    }
  

  
    // Handle errors
    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      throw error; // Rethrow error to be handled by the caller
    }

    
   public getScore(freelancerId: number,postId:number): Observable<any>{
      this.score=this.http.get<any>(`${this.url}/${Constant.FREELANCERS}/${freelancerId}/posts/${postId}/skills-match-score`);
      return this.score;

    }





}
