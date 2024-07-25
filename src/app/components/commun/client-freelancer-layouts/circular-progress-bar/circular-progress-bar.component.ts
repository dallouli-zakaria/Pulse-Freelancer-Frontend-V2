import { Component, Input } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrl: './circular-progress-bar.component.css'
})
export class CircularProgressBarComponent {
  // @Input() progress: number = 0;
  @Input() freelancerId!: number;
  @Input() postId!: number;
  progress: number = 50;
  color: string = 'red';
  constructor(private freelancerService:FreelancerService){
    this.scoreData();

    console.log('Received freelancer ID:', this.freelancerId);
    console.log('Received post ID:', this.postId);
  }
   step:any


  scoreData(){
    this.freelancerService.getScore(1,5).subscribe({
      next:(data:any)=>{
        console.log(data);
        
      },
      error:(error:any)=>{
        console.log(error);
        
      }
    })}
}