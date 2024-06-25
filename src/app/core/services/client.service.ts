import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Client } from '../models/Client';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
client!:any;
private dataSubject = new Subject<any>();
url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }

  public count():Observable<Client>{
   this.client=this.http.get(`${this.url}/${Constant.CLIENTCOUNT}`);
   return this.client;
  }
  
  public index(){
    this.client=this.http.get<Client[]>(`${this.url}/${Constant.CLIENTS}`).subscribe({
      next:(data:any) => this.dataSubject.next(data),
     error:( error) => console.error('Error fetching data', error),
    complete:()=>console.log('complet')
    });
 
  
  }

  public store(data:any) {
    this.client=this.http.post(`${this.url}/${Constant.CLIENTS}`,data)
   return this.client
  }
  getData(): Observable<Client[]> {
  
    return this.dataSubject.asObservable(); 
  }

  public update(id:any,data:Partial<Client>): Observable<Client> {
   this.client=this.http.put<Client>(`${this.url}/${Constant.CLIENTS}/${id}`,data)
   return this.client
  }
 
  public delete(id:any):Observable<Client>{
    this.client=this.http.delete(`${this.url}/${Constant.CLIENTS}`,id);
    return this.client

  }

}
