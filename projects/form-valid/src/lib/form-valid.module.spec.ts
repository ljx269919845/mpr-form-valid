import { FormValidModule } from './form-valid.module';

describe('FormValidModule', () => {
  let formValidModule: FormValidModule;

  beforeEach(() => {
    formValidModule = new FormValidModule();
  });

  it('should create an instance', () => {
    expect(formValidModule).toBeTruthy();
  });
});
