import { FreelancercontractService } from './../../../../../core/services/freelancercontract.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Client } from '../../../../../core/models/Client';
import { Contract } from '../../../../../core/models/Contract';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { ClientService } from '../../../../../core/services/client.service';
import { ContractService } from '../../../../../core/services/contract.service';
import { FreelancerService } from '../../../../../core/services/freelancer.service';
import { PostsService } from '../../../../../core/services/posts.service';
import { dateRangeValidator } from '../../../../../core/validators/date-range.validator';

@Component({
  selector: 'app-freelancer-contract-add',
  templateUrl: './freelancer-contract-add.component.html',
  styleUrl: './freelancer-contract-add.component.css'
})
export class FreelancerContractAddComponent {
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
    private postsService: PostsService,
    private freelancercontract: FreelancercontractService
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
    
    // Initialize freelancer data
    this.freelancerIndex();
    this.freelnacerSubject = this.freelancerService.getdata;

    // Initialize client data
    this.clientsubject = this.clientservices.getData$;
    this.clientIndex();

    // Initialize form builder for Contract
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(255)]],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        project_description: ['', Validators.required],
        freelancer_id: [this.freelancerid]
      },
      { validators: dateRangeValidator() }
    );
  }

  add() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.freelancercontract.store(this.form.value).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Contract créé avec succès',
            showConfirmButton: false,
            timer: 1500,
          });
          this.close();
        },
        error: (error: any) => {
          if (error.error.errors) {
            this.errorhandling = Object.values(error.error.errors).flat();
          } else {
            this.errorhandling = [error.message || 'An error occurred'];
          }
        },
      });
    } else {
      this.errorhandling = 'error validation';
    }
  }

  clientIndex() {
    this.clientservices.index();
    this.clientservices.getData$.subscribe({
      next: (data: any) => {
        this.client = data.sort((a: any, b: any) =>
          a.user.name.localeCompare(b.user.name)
        );
      },
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
      },
    });
  }

  postsdata() {
    this.postsService.index();
  }
}
