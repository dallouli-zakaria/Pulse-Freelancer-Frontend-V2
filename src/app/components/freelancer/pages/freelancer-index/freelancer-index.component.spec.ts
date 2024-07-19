import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerIndexComponent } from './freelancer-index.component';

describe('FreelancerIndexComponent', () => {
  let component: FreelancerIndexComponent;
  let fixture: ComponentFixture<FreelancerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
