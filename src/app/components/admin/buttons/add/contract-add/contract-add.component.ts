import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contract } from '../../../../../core/models/Contract';
import { ContractService } from '../../../../../core/services/contract.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../../core/models/Client';
import { ClientService } from '../../../../../core/services/client.service';
import { FreelancerService } from '../../../../../core/services/freelancer.service';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { Observable } from 'rxjs';
import { PostsService } from '../../../../../core/services/posts.service';
import Swal from 'sweetalert2';
import { dateRangeValidator } from '../../../../../core/validators/date-range.validator';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrl: './contract-add.component.css',
})
export class ContractAddComponent implements OnInit {
  contract: Contract[] = [];
  client: Client[] = [];
  freelancer: Freelancer[] = [];
  clientsubject!: Observable<Client[]>;
  freelnacerSubject!: Observable<Freelancer[]>;
  errorhandling: any;
  constructor(
    private contractService: ContractService,
    private fb: FormBuilder,
    private clientservices: ClientService,
    private freelancerService: FreelancerService,
    private postsService: PostsService
  ) {}
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }

  form!: FormGroup;
  errorhandeling: any;
  ngOnInit(): void {
    this.freelancerService.index();
    this.postsdata();
    // freelancer
    this.freelancerIndex();
    this.freelnacerSubject = this.freelancerService.getdata;
    // client
    this.clientsubject = this.clientservices.getData$;
    this.clientIndex();
    //form builder Contract
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(255)]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        project_description: ['', Validators.required],
        client_id: [this.freelancerid],
        freelancer_id: [this.clientid],
      },
      { validators: dateRangeValidator() }
    );
  }

  add() {
    // if(this.form.valid){
    console.log(this.form.value);

    this.contractService.store(this.form.value).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Contract créer avec succès',
          showConfirmButton: false,
          timer: 1500,
        });
        this.close();
      },
      error: (error: any) => {
        console.log(error);
        if (error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
    });
    // }else{
    //   this.errorhandeling='error validation'
    // }
  }
  clientIndex() {
    this.clientservices.index();
    this.clientservices.getData$.subscribe({
      next: (data: any) => {
        this.client = data.sort((a: any, b: any) =>
          a.user.name.localeCompare(b.user.name)
        );
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => console.log(' display data client completed'),
    });
  }
  freelancerid!: number;
  eventlistFreelancer($event: any) {
    this.freelancerid = $event.target.value;
  }
  clientid!: number;
  eventlistclient($event: any) {
    this.clientid = $event.target.value;
  }
  freelancerIndex() {
    this.freelancerService.index();
    this.freelancerService.getdata.subscribe({
      next: (data: any) => {
        this.freelancer = data.sort((a: any, b: any) =>
          a.user.name.localeCompare(b.user.name)
        );
        console.log(data);
      },
      error: (error) => console.log(error),
      complete: () => console.log(' display data freelancer completed'),
    });
  }

  postsdata() {
    this.postsService.index();
  }
}
