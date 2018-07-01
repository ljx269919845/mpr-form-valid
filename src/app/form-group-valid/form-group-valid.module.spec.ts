import { FormGroupValidModule } from './form-group-valid.module';

describe('FormGroupValidModule', () => {
  let formGroupValidModule: FormGroupValidModule;

  beforeEach(() => {
    formGroupValidModule = new FormGroupValidModule();
  });

  it('should create an instance', () => {
    expect(formGroupValidModule).toBeTruthy();
  });
});
