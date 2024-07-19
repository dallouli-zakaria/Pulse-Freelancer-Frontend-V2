import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerViewPostsComponent } from './freelancer-view-posts.component';

describe('FreelancerViewPostsComponent', () => {
  let component: FreelancerViewPostsComponent;
  let fixture: ComponentFixture<FreelancerViewPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerViewPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerViewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
