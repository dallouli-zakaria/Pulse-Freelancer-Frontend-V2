import { TestBed } from '@angular/core/testing';

import { FreelancercontractService } from './freelancercontract.service';

describe('FreelancercontractService', () => {
  let service: FreelancercontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreelancercontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
