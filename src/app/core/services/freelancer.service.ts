import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable, Observer, shareReplay } from 'rxjs';
import { Freelancer } from '../models/Freelancer';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  freelancer:any
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

   get getdata():Observable<Freelancer[]>{
   return this.subjectBe.asObservable();
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
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {

    // return this.http.post(this.API_URL + 'signup', {
    return this.http.post(`${this.url}/${Constant.FREELANCERS}`, {
      name,
      email,
      password,
      password_confirmation,
    });
  }


}
