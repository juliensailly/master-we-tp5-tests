import { TestBed } from '@angular/core/testing';
import { PokemonCommunication } from './pokemon-communication';

describe('PokemonCommunication', () => {
  let service: PokemonCommunication;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonCommunication],
    });
    service = TestBed.inject(PokemonCommunication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial pokemon id as -1', (done) => {
    service.selectedPokemonId$.subscribe((id) => {
      expect(id).toBe('-1');
      done();
    });
  });

  it('should have initial searched pokemon name as empty string', (done) => {
    service.searchedPokemonName$.subscribe((name) => {
      expect(name).toBe('');
      done();
    });
  });

  it('should update selected pokemon id', (done) => {
    const testId = '25';
    service.setSelectedPokemonId(testId);

    service.selectedPokemonId$.subscribe((id) => {
      expect(id).toBe(testId);
      done();
    });
  });

  it('should update searched pokemon name', (done) => {
    const testName = 'pikachu';
    service.setSearchedPokemonName(testName);

    service.searchedPokemonName$.subscribe((name) => {
      expect(name).toBe(testName);
      done();
    });
  });

  it('should get current pokemon id', () => {
    const testId = '150';
    service.setSelectedPokemonId(testId);
    expect(service.getCurrentPokemonId()).toBe(testId);
  });

  it('should get current searched name', () => {
    const testName = 'mewtwo';
    service.setSearchedPokemonName(testName);
    expect(service.getCurrentSearchedName()).toBe(testName);
  });

  it('should reset selection', (done) => {
    // D'abord définir des valeurs
    service.setSelectedPokemonId('25');
    service.setSearchedPokemonName('pikachu');

    // Réinitialiser
    service.resetSelection();

    // Vérifier que les valeurs sont réinitialisées
    expect(service.getCurrentPokemonId()).toBe('-1');
    expect(service.getCurrentSearchedName()).toBe('');

    service.selectedPokemonId$.subscribe((id) => {
      expect(id).toBe('-1');
      done();
    });
  });

  it('should emit multiple values in sequence', () => {
    const emittedValues: string[] = [];

    service.selectedPokemonId$.subscribe((id) => {
      emittedValues.push(id);
    });

    service.setSelectedPokemonId('1');
    service.setSelectedPokemonId('25');
    service.setSelectedPokemonId('150');

    expect(emittedValues).toContain('1');
    expect(emittedValues).toContain('25');
    expect(emittedValues).toContain('150');
  });
});
