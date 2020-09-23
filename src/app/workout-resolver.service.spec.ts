import { TestBed } from '@angular/core/testing';

import { WorkoutResolverService } from './workout-resolver.service';

describe('WorkoutResolverService', () => {
  let service: WorkoutResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
