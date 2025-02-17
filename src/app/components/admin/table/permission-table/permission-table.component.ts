import { Component, OnInit } from '@angular/core';
import { Permission } from '../../../../core/models/Permission';
import { Observable } from 'rxjs';
import { PermissionService } from '../../../../core/services/permission.service';

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrl: './permission-table.component.css'
})
export class PermissionTableComponent implements OnInit {

 permession:Permission[]=[];
 selectedID!:number;
 selectedData:any;
 permessionObservable!:Observable<Permission[]>
 constructor(private permissionService:PermissionService){}
 ngOnInit(): void {
  this.index()
  this.permessionObservable=this.permissionService.permissionData
 }
trackPemission(id:number,data:any){
this.selectedID=id;
this.selectedData=data
}

 index(){
  this.permissionService.index();
  this.permissionService.permissionData.subscribe({
    next:(data)=>{this.permession=data},
    error:(error)=>console.log(error),
    complete:()=>console.log('end operation')
  })
 }

 
  //manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;
showAssingPemissionToRole=false;
showAssingPemissionToUser=false


onEdited(id: number, role: any): void {
this.selectedID= id;
this.selectedData= role;
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted(id: number, role: any): void {
  this.selectedID= id;
  this.selectedData= role;
this.show = true;
this.showedelete = true;
this.showedit = false;

}
showAssingPermessionToRole(id: number, role: any): void {
  this.selectedID= id;
  this.selectedData= role;
this.show = true;
this.showedelete = false;
this.showedit = false;
this.showAssingPemissionToRole=true;
}
showAssingPermessionToUSers(id: number, role: any): void {
  this.selectedID= id;
  this.selectedData= role;
this.show = true;
this.showedelete = false;
this.showedit = false;
this.showAssingPemissionToRole=false;
this.showAssingPemissionToUser=true

}
          
onCloseModal(): void {
this.show = false;
this.showedit = false;
this.showedelete = false;
this.showAssingPemissionToRole=false;
this.showAssingPemissionToUser=false
}

onAssignPermessionTorole(data:any){
  this.show = false;
  this.showedit = false;
}

//end manage pages
}
