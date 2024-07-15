import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class MailService {
email:any
  constructor(private http:HttpClient) { }
url=Constant.API_ENDPOINT
sendMail(message:any){
this.email=this.http.post(`${this.url}/email`,message)
return this.email
}
}
