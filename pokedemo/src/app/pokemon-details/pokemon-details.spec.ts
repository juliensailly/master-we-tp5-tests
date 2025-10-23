import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokemonDetails } from './pokemon-details';

describe('PokemonDetails', () => {
  let component: PokemonDetails;
  let fixture: ComponentFixture<PokemonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetails],
      providers: [provideHttpClient()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPokemonId).toBe('-1');
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });
});
