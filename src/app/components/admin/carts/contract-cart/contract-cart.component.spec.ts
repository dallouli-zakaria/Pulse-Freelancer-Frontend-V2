import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCartComponent } from './contract-cart.component';

describe('ContractCartComponent', () => {
  let component: ContractCartComponent;
  let fixture: ComponentFixture<ContractCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
