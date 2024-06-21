import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Client } from '../models/Client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
client!:any;
url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }

  public count():Observable<Client>{
   this.client=this.http.get(`${this.url}/${Constant.CLIENTCOUNT}`);
   return this.client;
  }
  
  public index(){
    this.client=this.http.get<Client>(`${this.url}/${Constant.CLIENTS}`);
    return this.client;
  }

  public store(data:any):Observable<Client> {
    this.client=this.http.post(`${this.url}/${Constant.CLIENTS}`,data);
    return this.client
  }

  public update(id:any): Observable<Client> {
   this.client=this.http.put(`${this.url}/${Constant.CLIENTS}`,id);
   return this.client
  }
 
  public delete(id:any):Observable<Client>{
    this.client=this.http.delete(`${this.url}/${Constant.CLIENTS}`,id);
    return this.client

  }

}
