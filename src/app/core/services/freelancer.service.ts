import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  client:any
  constructor(private http:HttpClient) { }
   public count(){
    this.client=this.http.get("http://localhost:8000/api/freelancerCount");
    return this.client;
   }
 
}
