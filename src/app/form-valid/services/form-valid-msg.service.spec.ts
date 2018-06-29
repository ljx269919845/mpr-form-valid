import { TestBed, inject } from '@angular/core/testing';

import { FormValidMsgService } from './form-valid-msg.service';

describe('FormValidMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidMsgService]
    });
  });

  it('should be created', inject([FormValidMsgService], (service: FormValidMsgService) => {
    expect(service).toBeTruthy();
  }));
});
