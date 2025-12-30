import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe';
import { Pokemon } from './pokemon';

describe('FilterPokemonPipePipe', () => {
  let pipe: FilterPokemonPipePipe;
  let mockPokemons: Pokemon[];

  beforeEach(() => {
    pipe = new FilterPokemonPipePipe();
    mockPokemons = [
      new Pokemon('1', 'Bulbasaur', 'url1'),
      new Pokemon('25', 'Pikachu', 'url2'),
      new Pokemon('6', 'Charizard', 'url3'),
      new Pokemon('150', 'Mewtwo', 'url4'),
      new Pokemon('94', 'Gengar', 'url5')
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all pokemons when searchString is undefined', () => {
    const result = pipe.transform(mockPokemons, 'name', undefined);
    expect(result).toEqual(mockPokemons);
    expect(result.length).toBe(5);
  });

  it('should return all pokemons when searchString is empty', () => {
    const result = pipe.transform(mockPokemons, 'name', '');
    expect(result).toEqual(mockPokemons);
  });

  it('should filter pokemons by name (case insensitive)', () => {
    const result = pipe.transform(mockPokemons, 'name', 'pika');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Pikachu');
  });

  it('should filter pokemons by name with uppercase search', () => {
    const result = pipe.transform(mockPokemons, 'name', 'PIKA');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Pikachu');
  });

  it('should return multiple matches', () => {
    const result = pipe.transform(mockPokemons, 'name', 'a');
    expect(result.length).toBeGreaterThan(1);
    expect(result.some(p => p.name === 'Pikachu')).toBe(true);
    expect(result.some(p => p.name === 'Charizard')).toBe(true);
    expect(result.some(p => p.name === 'Gengar')).toBe(true);
  });

  it('should return empty array when no matches found', () => {
    const result = pipe.transform(mockPokemons, 'name', 'xyz');
    expect(result.length).toBe(0);
  });

  it('should filter by id property', () => {
    const result = pipe.transform(mockPokemons, 'id', '25');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('25');
  });

  it('should return empty array when pokes is undefined', () => {
    const result = pipe.transform(undefined as any, 'name', 'test');
    expect(result).toEqual([]);
  });

  it('should return empty array when property is undefined', () => {
    const result = pipe.transform(mockPokemons, undefined as any, 'test');
    expect(result).toEqual([]);
  });

  it('should handle partial matches', () => {
    const result = pipe.transform(mockPokemons, 'name', 'char');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Charizard');
  });

  it('should handle search at the beginning of the name', () => {
    const result = pipe.transform(mockPokemons, 'name', 'bulb');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Bulbasaur');
  });

  it('should handle search at the end of the name', () => {
    const result = pipe.transform(mockPokemons, 'name', 'saur');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Bulbasaur');
  });
});
