import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWhithRouter';
import App from '../App';

const testId = 'pokemon-name';
const nextTestId = 'next-pokemon';
const POKE_QTD = 9;

describe('Testes do componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toBe('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  test('Se é exibido o próximo da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const listOfNames = [screen.getByTestId(testId).innerHTML];
    const nextPokemonButton = screen.getByTestId(nextTestId);
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

    for (let index = 1; index <= POKE_QTD; index += 1) {
      userEvent.click(nextPokemonButton);
      const pokemonName = screen.getByTestId(testId).innerHTML;
      if (index < POKE_QTD) {
        listOfNames.push(pokemonName);
        expect(listOfNames[listOfNames.length - 1])
          .not.toBe(listOfNames[listOfNames.length - 2]);
      } else {
        expect(pokemonName).toBe(listOfNames[0]);
      }
    }
  });

  it('É mostrado apenas um Pokémon por  vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(buttonNextPokemon);
    expect(pokemon.length).toBe(1);
  });

  it('A Pokédex possui os botões de filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    const pokeTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const TYPES = 7;
    expect(btnAll).toBeInTheDocument();
    expect(pokeTypeBtn.length).toBe(TYPES);
  });

  it('A Pokédex filtra pokemons psíquicos', () => {
    renderWithRouter(<App />);

    const typePsychic = screen.getByRole('button', { name: /Psychic/i });
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    fireEvent.click(typePsychic);
    expect(typePsychic.textContent).toBe('Psychic');
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    fireEvent.click(buttonNextPokemon);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnAll.textContent).toBe('All');
    expect(firstPokemon).toBeInTheDocument();
    fireEvent.click(btnAll);
    expect(firstPokemon).toBeInTheDocument();
  });
});

