import { TestBed } from '@angular/core/testing';

import { KaizenService } from './kaizen.service';

describe('KaizenService', () => {
  let service: KaizenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaizenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
