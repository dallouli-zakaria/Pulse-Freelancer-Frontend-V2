import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { PackService } from '../../../../../core/services/pack.service';

@Component({
  selector: 'app-pack-delete',
  templateUrl: './pack-delete.component.html',
  styleUrl: './pack-delete.component.css'
})
export class PackDeleteComponent {
@Input() packID!:number;
@Input() packData:any;
errorhandling:any

constructor(private packService:PackService){}
@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}

deleted(){
  console.log(this.packID);
  if(this.packID !==null){
    this.packService.delete(this.packID).subscribe({
    next:(data)=>{console.log(data);
    
    },
     error:(error:any)=>{console.log(error); if ( error.error.errors) {
      this.errorhandling = Object.values(error.error.errors).flat();
    } else {
      this.errorhandling = [error.message || 'An error occurred'];
    }
     }
     
  })}
}
}