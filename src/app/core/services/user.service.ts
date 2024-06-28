import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
user:any
private subjectBe:BehaviorSubject<User[]>= new BehaviorSubject<User[]>([])
  constructor(private http:HttpClient) { }
url=Constant.API_ENDPOINT

  index(){
   this.user =this.http.get<User>(`${this.url}/${Constant.USER}`).pipe(shareReplay(1)).subscribe({
      next:(data:any)=>this.subjectBe.next(data),
      error:(error)=>{console.log(error) },
      complete:()=>console.log('end operation of subject')
    }).add(()=>console.log("user subject"))
  }

 get getData():Observable<User[]>{
    return this.subjectBe.asObservable()
  }

  store(userdata:any):Observable<User[]>{
    this.user = this.http.post<User[]>(`${this.url}/${Constant.USER}`,userdata);
    return this.user;
  }

  update(id:number,userdata:any):Observable<User[]>{
    this.user=this.http.put<User[]>(`${this.url}/${Constant.USER}/${id}`,userdata);
    return this.user
  }
  
  delete(id:number):Observable<User>{
    this.user=this.http.delete<User>(`${this.url}/${Constant.USER}/${id}`)
    return this.user
  }

  show(id:number):Observable<User>{
    this.user=this.http.get<User>(`${this.url}/${Constant.USER}/${id}`)
    return this.user
  }
}
