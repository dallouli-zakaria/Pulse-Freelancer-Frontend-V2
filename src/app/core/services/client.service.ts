import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Client } from '../models/Client';
import { BehaviorSubject, Observable, Subject, shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
client!:any;
private dataSubject:BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }

  public count():Observable<Client>{
   this.client=this.http.get(`${this.url}/${Constant.CLIENTCOUNT}`);
   return this.client;
  }
  
  public index(){
    this.client=this.http.get<Client[]>(`${this.url}/${Constant.CLIENTS}`).pipe(shareReplay(1)).subscribe({
       next: (data:any) =>  this.dataSubject.next(data),
       error:( error) => console.error(error),
       complete:()=>console.log('complet')})
   .add(()=>{console.log('subject')})
   
    }

  public store(data:any) {
    this.client=this.http.post(`${this.url}/${Constant.CLIENTS}`,data)
   return this.client
  }
  get getData(): Observable<Client[]> {
    return this.dataSubject.asObservable(); 
  }

  public update(id:any,data:Partial<Client>): Observable<Client> {
   this.client=this.http.put<Client>(`${this.url}/${Constant.CLIENTS}/${id}`,data)
   return this.client
  }
 
  public deleted(id:any):Observable<Client>{
    this.client=this.http.delete(`${this.url}/${Constant.CLIENTS}/${id}`);
    return this.client
  }


  show(id:number):Observable<Client>{
    this.client=this.http.get<Client>(`${this.url}/${Constant.CLIENTS}/${id}`)
    return this.client
  }

}
