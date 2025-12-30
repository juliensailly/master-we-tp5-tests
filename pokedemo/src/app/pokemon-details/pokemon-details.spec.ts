import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokemonDetails } from './pokemon-details';
import { PokemonCommunication } from '../pokemon-communication';
import { PokeAPI } from '../poke-api';

describe('PokemonDetails', () => {
  let component: PokemonDetails;
  let fixture: ComponentFixture<PokemonDetails>;
  let httpMock: HttpTestingController;
  let pokemonCommunicationService: PokemonCommunication;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonCommunication,
        PokeAPI
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetails);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    pokemonCommunicationService = TestBed.inject(PokemonCommunication);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPokemonId).toBe('-1');
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should load pokemon details when pokemon id is set', () => {
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
        { base_stat: 35, stat: { name: 'hp' } },
        { base_stat: 55, stat: { name: 'attack' } }
      ]
    };

    fixture.detectChanges(); // Triggers ngOnInit

    pokemonCommunicationService.setSelectedPokemonId('25');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);

    expect(component.pokemon.id).toBe('25');
    expect(component.pokemon.name).toBe('pikachu');
    expect(component.pokemon.height).toBe(4);
    expect(component.pokemon.weight).toBe(60);
    expect(component.pokemon.types).toContain('electric');
    expect(component.pokemon.stats.length).toBe(2);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when loading pokemon details', () => {
    fixture.detectChanges();

    pokemonCommunicationService.setSelectedPokemonId('999999');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999999/');
    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });

    expect(component.errorMessage).toBe('Erreur lors du chargement des données du pokémon');
    expect(component.isLoading).toBe(false);
  });

  it('should reset pokemon when id is -1', () => {
    fixture.detectChanges();

    // First load a pokemon
    pokemonCommunicationService.setSelectedPokemonId('25');
    const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25/');
    req1.flush({
      id: 25,
      name: 'pikachu',
      sprites: { front_default: 'url' },
      types: [],
      stats: []
    });

    // Then reset
    pokemonCommunicationService.setSelectedPokemonId('-1');

    expect(component.currentPokemonId).toBe('-1');
    expect(component.errorMessage).toBe('');
    expect(component.isLoading).toBe(false);
  });

  it('should translate stat names correctly', () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: '' },
      types: [],
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } },
        { base_stat: 49, stat: { name: 'defense' } },
        { base_stat: 65, stat: { name: 'special-attack' } },
        { base_stat: 65, stat: { name: 'special-defense' } },
        { base_stat: 45, stat: { name: 'speed' } }
      ]
    };

    fixture.detectChanges();
    pokemonCommunicationService.setSelectedPokemonId('1');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1/');
    req.flush(mockPokemon);

    expect(component.pokemon.stats[0].name).toBe('Points de Vie');
    expect(component.pokemon.stats[1].name).toBe('Attaque');
    expect(component.pokemon.stats[2].name).toBe('Défense');
    expect(component.pokemon.stats[3].name).toBe('Attaque Spéciale');
    expect(component.pokemon.stats[4].name).toBe('Défense Spéciale');
    expect(component.pokemon.stats[5].name).toBe('Vitesse');
  });

  it('should set loading state while fetching pokemon', () => {
    fixture.detectChanges();

    pokemonCommunicationService.setSelectedPokemonId('25');

    expect(component.isLoading).toBe(true);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25/');
    req.flush({
      id: 25,
      name: 'pikachu',
      sprites: { front_default: '' },
      types: [],
      stats: []
    });

    expect(component.isLoading).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    fixture.detectChanges();
    
    jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should handle pokemon with missing sprite', () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      sprites: {},
      types: [],
      stats: []
    };

    fixture.detectChanges();
    pokemonCommunicationService.setSelectedPokemonId('25');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25/');
    req.flush(mockPokemon);

    expect(component.pokemon.imgUrl).toBe('');
  });

  it('should map multiple types correctly', () => {
    const mockPokemon = {
      id: 6,
      name: 'charizard',
      sprites: { front_default: '' },
      types: [
        { type: { name: 'fire' } },
        { type: { name: 'flying' } }
      ],
      stats: []
    };

    fixture.detectChanges();
    pokemonCommunicationService.setSelectedPokemonId('6');

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/6/');
    req.flush(mockPokemon);

    expect(component.pokemon.types.length).toBe(2);
    expect(component.pokemon.types).toContain('fire');
    expect(component.pokemon.types).toContain('flying');
  });
});
