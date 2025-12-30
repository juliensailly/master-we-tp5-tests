import { Pokemon, PokemonStat } from './pokemon';

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon()).toBeTruthy();
  });

  it('should create with default values', () => {
    const pokemon = new Pokemon();
    expect(pokemon.id).toBe('-1');
    expect(pokemon.name).toBe('');
    expect(pokemon.imgUrl).toBe('');
  });

  it('should create with provided values', () => {
    const pokemon = new Pokemon('25', 'Pikachu', 'https://example.com/pikachu.png');
    expect(pokemon.id).toBe('25');
    expect(pokemon.name).toBe('Pikachu');
    expect(pokemon.imgUrl).toBe('https://example.com/pikachu.png');
  });

  it('should allow setting optional height', () => {
    const pokemon = new Pokemon('1', 'Bulbasaur');
    pokemon.height = 7;
    expect(pokemon.height).toBe(7);
  });

  it('should allow setting optional weight', () => {
    const pokemon = new Pokemon('1', 'Bulbasaur');
    pokemon.weight = 69;
    expect(pokemon.weight).toBe(69);
  });

  it('should allow setting optional types', () => {
    const pokemon = new Pokemon('1', 'Bulbasaur');
    pokemon.types = ['grass', 'poison'];
    expect(pokemon.types).toEqual(['grass', 'poison']);
    expect(pokemon.types?.length).toBe(2);
  });

  it('should allow setting optional stats', () => {
    const pokemon = new Pokemon('1', 'Bulbasaur');
    const stats: PokemonStat[] = [
      { name: 'HP', value: 45 },
      { name: 'Attack', value: 49 },
    ];
    pokemon.stats = stats;
    expect(pokemon.stats).toEqual(stats);
    expect(pokemon.stats?.length).toBe(2);
  });

  it('should create a complete pokemon instance', () => {
    const pokemon = new Pokemon('6', 'Charizard', 'https://example.com/charizard.png');
    pokemon.height = 17;
    pokemon.weight = 905;
    pokemon.types = ['fire', 'flying'];
    pokemon.stats = [
      { name: 'HP', value: 78 },
      { name: 'Attack', value: 84 },
    ];

    expect(pokemon.id).toBe('6');
    expect(pokemon.name).toBe('Charizard');
    expect(pokemon.imgUrl).toBe('https://example.com/charizard.png');
    expect(pokemon.height).toBe(17);
    expect(pokemon.weight).toBe(905);
    expect(pokemon.types).toEqual(['fire', 'flying']);
    expect(pokemon.stats?.length).toBe(2);
  });
});
