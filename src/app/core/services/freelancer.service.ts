import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { Observable, Observer } from 'rxjs';
import { Freelancer } from '../models/Freelancer';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  freelancer:any
  url=Constant.API_ENDPOINT
  constructor(private http:HttpClient) { }


   public count(){
    this.freelancer=this.http.get(`${this.url}/freelancerCount`);
    return this.freelancer;
   }
    
   public index():Observable<Freelancer>{
    this.freelancer=this.http.get(`${this.url}/${Constant.FREELANCERS}`);
    return this.freelancer
   }
    public store(data:any):Observable<Freelancer>{
      this.freelancer=this.http.post(`${this.url}/${Constant.FREELANCERS}`,data);
      return this.freelancer
   }

   public update(id:any):Observable<Freelancer>{
    this.freelancer=this.http.put(`${this.url}/${Constant.FREELANCERS}`,id);
    return this.freelancer;
   }
   
   public delete(id:any):Observable<Freelancer>{
    this.freelancer=this.http.delete(`${this.url}/${Constant.FREELANCERS}`);
    return this.freelancer
   }


}
