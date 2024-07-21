import { Component } from '@angular/core';
import { Pack } from '../../../../core/models/Pack';
import { PackService } from '../../../../core/services/pack.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pack-table',
  templateUrl: './pack-table.component.html',
  styleUrl: './pack-table.component.css'
})
export class PackTableComponent {



   pack:Pack[]=[];
  slecteID!:number;
  selectedData?:Pack;
  subjectob!:Observable<Pack[]>;
  trackFreelancer(user:any,id:number){
   this.slecteID=id;
   this.selectedData=user; 
  }
  constructor(private packService:PackService){}


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.subjectob=this.packService.getData
  this.indexed()
}

indexed(){
  this.packService.index()
  this.packService.getData.subscribe({
    next:(data:any)=>{
      this.pack=data;
    },
    error:(error:any)=>{
      console.log(error);
      
    },
    complete:()=>console.log('complited')

  })
}





 //manage page edite delete and details for assingnig 
 show = false;
 showedit = false;
 showedelete = false;
 
 
 onEdited(id:number,data:any): void {
  this.slecteID=id;
  this.selectedData=data
 this.show = true;
 this.showedit = true;
 this.showedelete = false;
 }
 
 ondeleted(id:number,data:any): void {
  this.slecteID=id;
  this.selectedData=data
 this.show = true;
 this.showedelete = true;
 this.showedit = false;
 
 }
           
 onCloseModal(): void {
 this.show = false;
 this.showedit = false;
 this.showedelete = false;
 }
 //end manage pages
 
}
