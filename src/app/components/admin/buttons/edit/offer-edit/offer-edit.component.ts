import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffersService } from '../../../../../core/services/offers.service';
import { Offer } from '../../../../../core/models/Offer';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrl: './offer-edit.component.css'
})
export class OfferEditComponent {
  @Input() offerObject?: Offer  ;
  @Input() offerId!: number;
  @Output() closeModal = new EventEmitter<void>();
    errorhandling: any;
  close(): void {
    this.closeModal.emit();
  }
 
  constructor(private offerService:OffersService){}
  private fb : FormBuilder = inject(FormBuilder);
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
    
   console.log(this.offerObject);
   
     this.form=this.fb.group({
       name: this.fb.control(this.offerObject?.selected, [Validators.required]),
      email: this.fb.control(this.offerObject?.post_id, [Validators.required]),
      profession:this.fb.control( this.offerObject?.freelancer_id, [Validators.required])
  
    })
   
  
  }
  
  form!:FormGroup
  updatedValue!: boolean;
  
  updated(){  
  
   if(this.offerId!==null  && this.form.valid){
  
    let updatedData=this.form.value
    updatedData.id = this.offerId;
    this.offerService.update(this.offerId,this.form.value).subscribe({
      next:(data:any)=>{this.updatedValue=true ;console.log(data);
        this.close()
   
      },
      error:(error:any)=>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>{console.log('end operation');
      } 
    })
  
      
   }else{
    console.log('error ');
    
   }
  
  }
  
  //  chaged(){
  //   if(this.updatedValue===true){
  // this.close=true
  //   }
  //  }
  
   public ngOnChanges(): void {
    this.form=this.fb.group({
      name: this.fb.control(this.offerObject?.selected, [Validators.required]),
     email: this.fb.control(this.offerObject?.post_id, [Validators.required]),
     profession:this.fb.control( this.offerObject?.freelancer_id, [Validators.required])

   })
   }
}
