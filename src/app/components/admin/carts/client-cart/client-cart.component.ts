import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.css'
})
export class ClientCartComponent {
  numberClient:any
constructor(private clients:ClientService){}
 
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.count()
}


count(){
  this.numberClient=this.clients.count().subscribe({
    next: (data:any)=>{
      this.numberClient=data
      console.log(data);
      
    },
    error: (eror:any)=>{
      console.log(eror);   
    }
    })
  }
}
