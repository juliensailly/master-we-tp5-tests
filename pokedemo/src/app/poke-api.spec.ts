import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokeAPI } from './poke-api';

describe('PokeAPI', () => {
  let service: PokeAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(PokeAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
