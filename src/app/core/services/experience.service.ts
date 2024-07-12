import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  
  experience:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Experience[]>=new BehaviorSubject<Experience[]>([])

  constructor(private http:HttpClient) { }
  
  public count(){
    this.experience=this.http.get(`${this.url}/experienceCount`);
    return this.experience
  }
  public index(){
    this.experience=this.http.get(`${this.url}/${Constant.EXPERIENCE}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>this.subject.next(data),
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation') 
    }).add(console.log('suject permession'))
 
  }
  get experienceData():Observable<Experience[]>{
    return this.subject.asObservable();
  }

  public store(data:any):Observable<Experience[]>{
  this.experience=this.http.put(`${this.url}/${Constant.EXPERIENCE}`,data);
  return this.experience
  }

  public update(id:any,data:any):Observable<Experience>{
    this.experience=this.http.put(`${this.url}/${Constant.EXPERIENCE}/${id}`,data);
    return this.experience
  }
   
  public delete(id:number):Observable<Experience>{
    this.experience=this.http.delete(`${this.url}/${Constant.EXPERIENCE}/${id}`);
    return this.experience
  }
  public addexperience(data:any,id:number){

    this.experience=this.http.post(`${this.url}/${Constant.EXPERIENCE}/${id}/experience`,data);

    return this.experience

  }


  public show(id:any):Observable<Experience>{
    this.experience=this.http.get(`${this.url}/${Constant.EXPERIENCE}/${id}`);
    return this.experience
  }



  public showByFreelancer(id:any):Observable<Experience[]>{
    this.experience=this.http.get(`${this.url}/${Constant.EXPERIENCE}/freelancer/${id}`);
    return this.experience
  }

}
