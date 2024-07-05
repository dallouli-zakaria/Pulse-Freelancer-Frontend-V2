import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolechipsAutocompleteComponent } from './rolechips-autocomplete.component';

describe('RolechipsAutocompleteComponent', () => {
  let component: RolechipsAutocompleteComponent;
  let fixture: ComponentFixture<RolechipsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolechipsAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolechipsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
