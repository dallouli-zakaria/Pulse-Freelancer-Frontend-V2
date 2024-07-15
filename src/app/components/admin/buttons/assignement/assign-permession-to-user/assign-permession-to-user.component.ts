import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../core/models/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { Permission } from '../../../../../core/models/Permission';

@Component({
  selector: 'app-assign-permession-to-user',
  templateUrl: './assign-permession-to-user.component.html',
  styleUrl: './assign-permession-to-user.component.css'
})
export class AssignPermessionToUserComponent {

  getdata!:Observable<User[]>
  @Input() permissionData?:Permission;
  user:User[]=[];
  // form!:FormGroup; 

  errorhandling: any;
  @Output() closeModal = new EventEmitter<void>();
   userID:any
  close(): void {
    this.closeModal.emit();
  }

constructor(private fb:FormBuilder,private userService:UserService){}

 
//oninit
  ngOnInit(): void {
   console.log(this.user);
    this.index()
    this.getdata=this.userService.getData;
    // this.form=this.fb.group(
    //   {
    //     role:[this.roleName],  
    //    });     
  }

    eventlist($event:any){
     this.userID=$event.target.value
    }

    public  index(){
       this.userService.index();
       this.userService.getData.subscribe({
        next:(data:any)=>{
        this.user=data;
        console.log(this.user);
     },
      error:(error)=>{console.log(error);
        if ( error.error.errors) {
         this.errorhandling = Object.values(error.error.errors).flat();
         } else {
          this.errorhandling = [error.message || 'An error occurred'];
          }
     }, 
      complete:()=>console.log('end Operation')
     })
    }
    gratPermessionToUser(){
      console.log(this.userID);
      if(this.userID !==undefined){
        const object:any={
                id:this.userID,
                permessions:this.permissionData?.name
         }
         console.log(object);
         
          this.userService.grantPermessionToUSer(object.value).subscribe({
           next:(data)=>{console.log(data);
           this.close()
          },
           error:(error)=>{
             if ( error.error.errors) {
              this.errorhandling = Object.values(error.error.errors).flat();
             } else {
               this.errorhandling = [error.message || 'An error occurred'];
             };
             console.log(error);
             
          }
          })


      }else{
        this.errorhandling='Please select Role'
      }
    
    }
  }
