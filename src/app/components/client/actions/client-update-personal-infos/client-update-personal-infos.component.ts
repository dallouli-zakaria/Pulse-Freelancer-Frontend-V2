import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../../../core/models/Client';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-update-personal-infos',
  templateUrl: './client-update-personal-infos.component.html',
  styleUrl: './client-update-personal-infos.component.css'
})
export class ClientUpdatePersonalInfosComponent implements OnInit,OnChanges{

  @Input() clientData!: Client;
  clientdetails!:Client;
  clientId = this.authservice.parseID();
  form!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);

  
  constructor(private clients: ClientService, private authservice: AuthService) {}
  ngOnChanges(): void {
    this.form = this.fb.group({
      name: this.fb.control(this.clientData?.user.name, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(this.clientData?.user.email, [Validators.required, Validators.email]),
      profession: this.fb.control(this.clientData?.profession, [Validators.required])
    });
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(this.clientData?.user.name, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(this.clientData?.user.email, [Validators.required, Validators.email]),
      profession: this.fb.control(this.clientData?.profession, [Validators.required])
    });
  }

  updated() {
    if (this.form.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.clients.update(this.clientId, this.form.value).subscribe({
      next: (data: any) => {
        this.clients.show(this.clientId);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('end operation');
      }
    });
  }
}
