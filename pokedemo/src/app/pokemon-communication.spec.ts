import { TestBed } from '@angular/core/testing';

import { PokemonCommunication } from './pokemon-communication';

describe('PokemonCommunication', () => {
  let service: PokemonCommunication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCommunication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
