import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerDeleteComponent } from './freelancer-delete.component';

describe('FreelancerDeleteComponent', () => {
  let component: FreelancerDeleteComponent;
  let fixture: ComponentFixture<FreelancerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
