import { Component, EventEmitter, OnInit, Output, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PackService } from '../../../../../core/services/pack.service';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrl: './pack-edit.component.css'
})
export class PackEditComponent implements OnInit,OnChanges {
  errorhandling:any
  form!:FormGroup
  @Input() packID!:number;
  @Input() packData:any;
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
  constructor(private packService:PackService, private fb:FormBuilder){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form=this.fb.group({
    title: this.fb.control(this.packData.title),
    description: this.fb.control(this.packData.description),
    price: this.fb.control(this.packData.price),
  })
 }

 ngOnChanges(): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.form=this.fb.group({
    title: [this.packData?.title, Validators.required],
    description:[this.packData?.description, Validators.required],
    price:[this.packData?.price, Validators.required],
  })
 }

 updated(){
  if(this.form.valid){
    this.packService.update(this.packID,this.form.value).subscribe({
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
