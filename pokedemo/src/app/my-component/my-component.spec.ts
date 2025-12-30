import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PokeAPI } from '../poke-api';
import { PokemonCommunication } from '../pokemon-communication';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let httpMock: HttpTestingController;
  let pokemonCommunicationService: PokemonCommunication;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
      imports: [FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), PokemonCommunication, PokeAPI],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
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

  it('should load pokemons on init', () => {
    const mockResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      ],
    };

    component.ngOnInit(); // Appel manuel de ngOnInit sans fixture.detectChanges()

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.pokemons.length).toBe(3);
    expect(component.pokemons[0].name).toBe('Bulbasaur');
    expect(component.pokemons[0].id).toBe('1');
    expect(component.isLoadingPokemons).toBe(false);
  });

  it('should handle error when loading pokemons', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    req.flush('Error loading pokemons', { status: 500, statusText: 'Server Error' });

    expect(component.errorLoadingPokemons).toBe(
      'Erreur lors du chargement de la liste des Pokémons'
    );
    expect(component.isLoadingPokemons).toBe(false);
  });

  it('should capitalize first letter of pokemon name', () => {
    const mockResponse = {
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
    };

    component.ngOnInit();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    req.flush(mockResponse);

    expect(component.pokemons[0].name).toBe('Pikachu');
  });

  it('should update selected pokemon id on selection', () => {
    jest.spyOn(pokemonCommunicationService, 'setSelectedPokemonId');

    component.selectedPokemonId = '25';
    component.onPokemonSelection();

    expect(pokemonCommunicationService.setSelectedPokemonId).toHaveBeenCalledWith('25');
  });

  it('should display selected pokemon', () => {
    const mockResponse = {
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
    };

    component.ngOnInit();
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    req.flush(mockResponse);

    jest.spyOn(pokemonCommunicationService, 'setSelectedPokemonId');

    component.selectedPokemonId = '25';
    component.displaySelectedPokemon();

    expect(pokemonCommunicationService.setSelectedPokemonId).toHaveBeenCalledWith('25');
  });

  it('should subscribe to pokemon communication service', () => {
    component.ngOnInit();
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    req.flush({ results: [] });

    pokemonCommunicationService.setSelectedPokemonId('150');

    expect(component.selectedPokemonId).toBe('150');
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
    req.flush({ results: [] });

    jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
