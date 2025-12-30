import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokeAPI } from './poke-api';

describe('PokeAPI', () => {
  let service: PokeAPI;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PokeAPI);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifier qu'il n'y a pas de requêtes HTTP en attente
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemons with default limit', () => {
    const mockResponse = {
      count: 100,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ]
    };

    service.getPokemons().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect((response as any).results.length).toBe(3);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=100');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get pokemons with custom limit', () => {
    const mockResponse = {
      count: 151,
      results: Array(151).fill({ name: 'pokemon', url: 'https://pokeapi.co/api/v2/pokemon/1/' })
    };

    service.getPokemons(151).subscribe(response => {
      expect((response as any).results.length).toBe(151);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get a single pokemon by id', () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      },
      types: [
        { type: { name: 'electric' } }
      ],
      stats: [
        { base_stat: 35, stat: { name: 'hp' } }
      ]
    };

    service.getPokemon('25').subscribe(response => {
      expect(response).toEqual(mockPokemon);
      expect((response as any).name).toBe('pikachu');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should handle error when getting pokemons', () => {
    const errorMessage = 'Network error';

    service.getPokemons().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=100');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when getting a single pokemon', () => {
    service.getPokemon('999999').subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999999/');
    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });
  });
});
