import { TestBed } from '@angular/core/testing';

import { UinfoService } from './uinfo.service';

describe('UinfoService', () => {
  let service: UinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
