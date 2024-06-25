import { Component } from '@angular/core';
import { ContractService } from '../../../../core/services/contract.service';

@Component({
  selector: 'app-contract-cart',
  templateUrl: './contract-cart.component.html',
  styleUrl: './contract-cart.component.css'
})
export class ContractCartComponent {
  contract:any
  constructor(private contracts:ContractService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.count()
  }

  count(){
    this.contracts.count().subscribe({
      next: (data:any)=>{
        this.contract=data;
        console.log(data);
        
      },
      error:(error:any)=>{
        console.log(error);
        
      },
      complet:()=>console.log('endoperation')
      
    })
  }
}
