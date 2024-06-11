import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
client:any;
url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }

  public count(){
   this.client=this.http.get(`${this.url}/clientCount`);
   return this.client;
  }
}
