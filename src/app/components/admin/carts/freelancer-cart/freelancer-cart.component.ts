import { Component, EventEmitter, Output } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-cart',
  templateUrl: './freelancer-cart.component.html',
  styleUrl: './freelancer-cart.component.css'
})
export class FreelancerCartComponent {
  @Output() datafreelancert:any=new EventEmitter<number>()
  freelancer:any
  constructor(private freelancers:FreelancerService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.count();
  }

  count(){
    this.freelancers.count().subscribe({
      next: (data:any)=>{
        this.freelancer=data;
        this.datafreelancert.emit(this.freelancer)
      },
      error: (error:any)=>{
        console.log(error);
        
      },
      complet:()=>console.log('end operation')
      
    })
  }
}
