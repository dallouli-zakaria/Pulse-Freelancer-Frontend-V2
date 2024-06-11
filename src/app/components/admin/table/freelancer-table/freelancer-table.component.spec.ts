import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerTableComponent } from './freelancer-table.component';

describe('FreelancerTableComponent', () => {
  let component: FreelancerTableComponent;
  let fixture: ComponentFixture<FreelancerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreelancerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
