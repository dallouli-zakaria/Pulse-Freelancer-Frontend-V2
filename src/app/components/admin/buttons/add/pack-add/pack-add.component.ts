import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PackService } from '../../../../../core/services/pack.service';

@Component({
  selector: 'app-pack-add',
  templateUrl: './pack-add.component.html',
  styleUrl: './pack-add.component.css'
})
export class PackAddComponent {
  errorhandling:any
  form!:FormGroup
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
  constructor(private packService:PackService, private fb:FormBuilder){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form=this.fb.group({
    title:new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
  })
 }


 stored(){
  if(this.form.valid){
    this.packService.store(this.form.value).subscribe({
      next:(data:any)=>{
       this.packService.index();
       this.close();
       console.log(data);
      },
      error:(error:any)=>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>console.log('add opperation ended')
      
    })
  }
 }


}
