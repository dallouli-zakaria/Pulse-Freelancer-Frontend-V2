import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-update-about',
  templateUrl: './freelancer-update-about.component.html',
  styleUrl: './freelancer-update-about.component.css',
})
export class FreelancerUpdateAboutComponent implements OnInit, OnChanges {
  @Input() freelancerID!: number;
  @Input() freelancerData?: Freelancer;

  freelancer: Freelancer[] = [];
  form!: FormGroup;
  errorhandling: any;
  characterCount: number = 0;

  private fb: FormBuilder = inject(FormBuilder);
  private freelancerService: FreelancerService = inject(FreelancerService);

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      summary: [
        this.freelancerData?.summary,
        [Validators.required, Validators.minLength(30)],
      ],
    });
    this.onSummaryInput();
  }

  onSummaryInput(): void {
    const summaryControl = this.form.get('summary');
    if (summaryControl) {
      this.characterCount = summaryControl.value?.length || 0;
    }
  }

  updated(): void {
    if (this.form.valid && this.freelancerID !== null) {
      this.freelancerService
        .update(this.freelancerID, this.form.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.close();
            this.freelancerService.show(this.freelancerID);
          },
          error: (error) => {
            if (error.error.errors) {
              this.errorhandling = Object.values(error.error.errors).flat();
            } else {
              this.errorhandling = [error.message || 'An error occurred'];
            }
          },
        });
    } else {
      this.errorhandling = 'Please enter at least 30 characters.';
    }
  }

  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
