import { TestBed, inject } from '@angular/core/testing';

import { GlobalValidMsgService } from './global-valid-msg.service';

describe('GlobalValidMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalValidMsgService]
    });
  });

  it('should be created', inject([GlobalValidMsgService], (service: GlobalValidMsgService) => {
    expect(service).toBeTruthy();
  }));
});
