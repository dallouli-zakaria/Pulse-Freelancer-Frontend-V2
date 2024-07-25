import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contract } from '../models/Contract';
import { controllers } from 'chart.js';
import { Freelancer } from '../models/Freelancer';
import { PaginatedResponse } from '../models/PaginatedResponse';


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

  fetchPaginatedContracts(page: number = 1): Observable<PaginatedResponse<Contract>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedResponse<Contract>>(`${this.url}/freelancerPagination`, { params });
  }

  public store(data:any):Observable<Contract>{
  this.contract=this.http.post(`${this.url}/${Constant.CONTARCTS}`,data);
  return this.contract
  }
   
  public update(id:number,data:any):Observable<Contract>{
    this.contract=this.http.put(`${this.url}/${Constant.CONTARCTS}/${id}`,data);
    return this.contract
  }


  public delete(id:any):Observable<Contract> {
    this.contract=this.http.delete(`${this.url}/${Constant.CONTARCTS}/${id}`);
    return this.contract
  }

}
