import { TestBed } from '@angular/core/testing';

import { ModaliteService } from './modalite.service';

describe('ModaliteService', () => {
  let service: ModaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
