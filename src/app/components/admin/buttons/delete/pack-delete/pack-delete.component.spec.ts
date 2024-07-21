import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackDeleteComponent } from './pack-delete.component';

describe('PackDeleteComponent', () => {
  let component: PackDeleteComponent;
  let fixture: ComponentFixture<PackDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
