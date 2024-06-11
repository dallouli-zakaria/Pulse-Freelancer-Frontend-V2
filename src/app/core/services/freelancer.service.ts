import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  client:any
  url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }
   public count(){
    this.client=this.http.get(`${this.url}/freelancerCount`);
    return this.client;
   }
}
