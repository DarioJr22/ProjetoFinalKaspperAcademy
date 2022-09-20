import { TestBed } from '@angular/core/testing';

import { AlertmodalService } from './alertmodal.service';

describe('AlertmodalService', () => {
  let service: AlertmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
