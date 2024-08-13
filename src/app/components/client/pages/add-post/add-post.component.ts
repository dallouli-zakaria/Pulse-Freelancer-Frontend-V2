import { ClientService } from './../../../../core/services/client.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{

  @Output() skillsSubmitted = new EventEmitter<string[]>();



  skills: string[] = ['JavaScript', 'PHP', 'Python', 'Java', 'C#', 'Angular', 'React'];
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];
  showSuggestions: boolean = false;
  isAuthenticated: boolean = false;


  selectedSkillIds: number[] = [];
  clientdetails!:any;
  selectedBudget!:string;
  selectedPeriod!:string;
  clientId!:number;
  form!:FormGroup;
  isSubmitting: boolean = false;
  tokenn!: any;
  userid:any=this.authservice.parseID();
  cities: string[] = ['Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan','Autre'];

  constructor(  private fb:FormBuilder,private postsservice:PostsService,private router: Router,private authservice:AuthService, private clientservice: ClientService,private loadingservice:LoadingService){

    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      freelancers_number: [''],
      skills_required: [[]],
      period: ['', Validators.required],
      periodvalue:[0,Validators.required],
      budget: ['', Validators.required],
      budgetvalue: [0,Validators.required],
      client_id:[this.userid]
    });
  }
  ngOnInit(): void {
    this.accessAddOffer();
  }

  onBudgetChange(event: any) {
    this.selectedBudget = event.target.value;
    
  }
  onSelectChange(event: any) {
    this.selectedPeriod = event.target.value;
    
  }


  addoffer() {
    if (this.form.valid) {
      this.isSubmitting = true;
      console.log('Form value before submission:', this.form.value);
      this.postsservice.store(this.form.value).subscribe({
      next:   (res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Votre offer a été ajouté avec succès",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['../pulse/client-profile/client-offers-open']); 
        },
      error : (err) => 
           console.log(err)
        
      })
    } else {
      console.log('Form is invalid');
    }




  }

 


  onSkillsSelected(skills: string[]) {
    this.selectedSkills = skills;
    this.form.patchValue({ skills: this.selectedSkills });
  }

  onSkillsSelected2(skillIds: number[]) {
    this.selectedSkillIds = skillIds;
    this.form.patchValue({ skills_required: this.selectedSkillIds });
  }



  





  filterSkills(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.skills.filter(skill => 
      skill.toLowerCase().includes(filterValue) && 
      !this.selectedSkills.includes(skill)
    );
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (input && input.length >= 2) {
      this.filteredSkills = this.filterSkills(input);
      this.showSuggestions = true;
    } else {
      this.filteredSkills = [];
      this.showSuggestions = false;
    }
  }

  addSkill(event: Event): void {
    event.preventDefault();
    const value = this.form.get('skillInput')?.value.trim();
    
    // Check if the entered skill exists in the predefined skills array
    if (value && this.skills.includes(value) && !this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
    } else {
      // Optionally, you can show a message or handle invalid skill entries here
      console.log('Please select a skill from the suggestions.');
    }
  }

  addSkillFromList(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.form.get('skillInput')?.reset();
      this.filteredSkills = [];
      this.showSuggestions = false;
    }
  }

  removeSkill(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.selectedSkills.length > 0) {
      this.skillsSubmitted.emit(this.selectedSkills);
      this.selectedSkills = [];
    }
  }

  accessAddOffer(){
    this.loadingservice.show();
    this.isAuthenticated = this.authservice.isLoggedIn();
    if (this.isAuthenticated) {
      
      this.clientservice.show(this.userid)
      this.clientservice.getData$.subscribe((res)=>
        {
          this.clientdetails=res;
          if(this.clientdetails.profession == null || this.clientdetails.company_name == null ){
            
            this.router.navigate(['/pulse/client-profile/client-infos']);  
             
          }else{
            this.loadingservice.hide();
          }
          
        
          
        }
    )

    }; 
  }


}
