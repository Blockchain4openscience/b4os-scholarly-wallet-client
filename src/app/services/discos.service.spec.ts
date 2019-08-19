import { TestBed } from '@angular/core/testing';

import { DiscosService } from './discos.service';

describe('DiscosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscosService = TestBed.get(DiscosService);
    expect(service).toBeTruthy();
  });
});
