import { TestBed } from '@angular/core/testing';

import { ResearchObjectsService } from './research-objects.service';

describe('ResearchObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResearchObjectsService = TestBed.get(ResearchObjectsService);
    expect(service).toBeTruthy();
  });
});
