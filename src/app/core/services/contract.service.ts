import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contract } from '../models/Contract';
import { controllers } from 'chart.js';
import { Freelancer } from '../models/Freelancer';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
 contract:any
 url=Constant.API_ENDPOINT
 public subject:BehaviorSubject<Contract[]>=new BehaviorSubject<Contract[]>([]);
  constructor(private http:HttpClient) { }


  public count(){
    this.contract=this.http.get(`${this.url}/contractCount`);
  return this.contract;
  }
   
  public index(){
    this.contract=this.http.get<Contract[]>(`${this.url}/${Constant.CONTARCTS}`).subscribe({
      next:(data: any)=>{this.subject.next(data)
        console.log(data);
        
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')
    }).add(console.log('subjetc contract'));
  }
   
  get contractData():Observable<Contract[]>{
    return this.subject.asObservable();
  }
  public store(data:any):Observable<Contract>{
  this.contract=this.http.post(`${this.url}/${Constant.CONTARCTS}`,data);
  return this.contract
  }
   
  public update(id:any):Observable<Contract>{
    this.contract=this.http.put(`${this.url}/${Constant.CONTARCTS}`,id);
    return this.contract
  }


  public delete(id:any):Observable<Contract> {
    this.contract=this.http.delete(`${this.url}/${Constant.CONTARCTS}`);
    return this.contract
  }

}
