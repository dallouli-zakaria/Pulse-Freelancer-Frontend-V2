import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-circular-progressbar',
  templateUrl: './circular-progressbar.component.html',
  styleUrls: ['./circular-progressbar.component.css']
})
export class CircularProgressbarComponent implements OnChanges {
  @Input() itemId!: number;
  @Input() postId2!: number;
  progress: any = { score: 0 }; // Initialize progress with default value
  strokeDashArray: string = '';

  constructor(private freelancerService: FreelancerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemId'] || changes['postId2']) {
      this.scoreData();
    }
  }

  scoreData() {
    if (this.itemId && this.postId2) {
      this.freelancerService.getScore(this.itemId, this.postId2).subscribe(
        (score: any) => {
          this.progress = score;  
          this.updateProgress(this.progress.score);  // Update the progress
        },
        error => console.error('Error calculating score:', error)
      );
    }
  }

  updateProgress(percentage: number): void {
    const circumference = 2 * Math.PI * 45;
    const offset = (percentage / 100) * circumference;
    this.strokeDashArray = `${offset} ${circumference}`;
  }

  getProgressColor(): string {
    if (this.progress.score <= 25) {
      return 'red';
    } else if (this.progress.score <= 50) {
      return 'orange';
    } else if (this.progress.score <= 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  getFormattedScore(score: number): number {
    return Math.floor(score);
  }
}
