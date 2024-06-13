import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddComponent } from './freelancer-add.component';

describe('FreelancerAddComponent', () => {
  let component: FreelancerAddComponent;
  let fixture: ComponentFixture<FreelancerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
