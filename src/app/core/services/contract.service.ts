import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contract } from '../models/Contract';
import { PaginatedResponse } from '../models/PaginatedResponse';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  //variables
  contract:any
  url=Constant.API_ENDPOINT
  public subject:BehaviorSubject<Contract[]>=new BehaviorSubject<Contract[]>([]);
  //injection by constructor
   constructor(private http:HttpClient) { }
  //subject variables 
   contractData$=this.subject.asObservable();
  // counte function
   public count(){
     this.contract=this.http.get(`${this.url}/contractCount`);
     return this.contract;
   }
   
  //get data from index function using event subject behavior 
   public index(){
     this.contract=this.http.get<Contract[]>(`${this.url}/${Constant.CONTARCTS}`).subscribe({
      next:(data: any)=>{this.subject.next(data)
      console.log(data);
       },
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation')
    }).add(console.log('subjetc contract'));
   } 
   
   // pagination contract
    public fetchPaginatedContracts(page: number = 1): Observable<PaginatedResponse<Contract>> {
     const params = new HttpParams().set('page', page.toString());
     return this.http.get<PaginatedResponse<Contract>>(`${this.url}/freelancerPagination`, { params });
     }
    // get contracts by id
    public store(data:any):Observable<Contract>{
    this.contract=this.http.post(`${this.url}/${Constant.CONTARCTS}`,data)
    return this.contract
   }
   //update function
    public update(id:number,data:any):Observable<Contract>{
      this.contract=this.http.put(`${this.url}/${Constant.CONTARCTS}/${id}`,data);
      return this.contract
     }

   //deleted function
    public delete(id:any):Observable<Contract> {
     this.contract=this.http.delete(`${this.url}/${Constant.CONTARCTS}/${id}`);
     return this.contract
    }

    //show by client_id
    public showbyclient(client_id:number):Observable<Contract>{
      this.contract=this.http.get(`${this.url}/${Constant.CONTARCTS}/client/${client_id}`);
      return this.contract
     }
    //show by freelancer_id
    public showbyfreelancer(freelancer_id:number):Observable<Contract>{
      this.contract=this.http.get(`${this.url}/${Constant.CONTARCTS}/freelancer/${freelancer_id}`);
      return this.contract
     }


}
