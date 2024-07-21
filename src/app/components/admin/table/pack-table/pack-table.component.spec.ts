import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackTableComponent } from './pack-table.component';

describe('PackTableComponent', () => {
  let component: PackTableComponent;
  let fixture: ComponentFixture<PackTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
