import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '../../../../core/models/Client';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-update-company-infos',
  templateUrl: './client-update-company-infos.component.html',
  styleUrl: './client-update-company-infos.component.css'
})
export class ClientUpdateCompanyInfosComponent implements OnInit,OnChanges{
  @Input() clientData!:Client

  clientId = this.authservice.parseID();
  form!: FormGroup;
  clientdetails!:Client;
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
  constructor(private clients: ClientService, private authservice: AuthService) {}
  ngOnChanges(): void {
  
     
    this.form = this.fb.group({
      company_name: this.fb.control(this.clientdetails?.company_name, [Validators.required, Validators.minLength(3)]),
      company_activity: this.fb.control(this.clientdetails?.company_activity, [Validators.required]),
      company_email: this.fb.control(this.clientdetails?.company_email, [Validators.required, Validators.email])
    });
  }
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.getdata();
    this.form = this.fb.group({
      company_name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      company_activity: this.fb.control('', [Validators.required]),
      company_email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  updated() {
    if (this.form.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.clients.update(this.clientId, this.form.value).subscribe({
      next: (data: any) => {
        this.clients.index();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('end operation');
      }
    });
  }
  getdata(){
    this.clients.show(this.clientId)
    this.clients.getData$.subscribe(
      (res:any)=>{this.clientdetails=res;

        
      })
  }
}
