import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Pack } from '../models/Pack';
import { Constant } from './../Constant';

@Injectable({
  providedIn: 'root'
})
export class PackService {
pack:any
url=Constant.API_ENDPOINT
subject:BehaviorSubject<Pack[]>=new BehaviorSubject<Pack[]>([]);
  constructor(private http:HttpClient) { }

public index(){
 this.http.get(`${this.url}/pack`).pipe(shareReplay(1)).subscribe({
  next:(data:any)=>{
    this.subject.next(data);
  },
  error:(error:any)=>console.log(error),
  complete:()=>console.log('end operation')
 }).add( console.log('end operation replay'))
}
 

get getData():Observable<Pack[]>{
  return this.subject.asObservable();
}

public update(data:any,id:number):Observable<Pack[]>{
 this.pack=this.http.put<Pack[]>(`${this.url}/pack/${id}`,data);
 return this.pack
}
public store(data:any):Observable<Pack[]>{
  this.pack=this.http.post<Pack[]>(`${this.url}/pack`,data);
  return this.pack
 }
 

 public delete(id:number):Observable<Pack[]>{
  this.pack=this.http.delete(`${this.url}/pack/${id}`);
  return this.pack
 }
 


}
