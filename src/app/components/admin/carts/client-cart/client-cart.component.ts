import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrl: './client-cart.component.css'
})
export class ClientCartComponent {
  @Output() dataclient:any=new EventEmitter<number>()
numberClient:any
constructor(private clients:ClientService){}
 
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.count();

}


count(){
  this.clients.count().subscribe({
    next: (data:any)=>{
      this.numberClient=data
      console.log(data); 
      this.dataclient.emit(this.numberClient) ;
      console.log('Data emitted: ', this.numberClient);  
    },
    error: (eror:any)=>{
      console.log(eror);   
    },
    complete:()=>console.log('end operation')
    
  });
    
  }
}
