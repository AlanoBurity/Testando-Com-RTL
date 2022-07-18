import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWhithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  const pokemonLink = '/pokemons/25';
  test('Se é renderizado um card com as informações do Pokémon', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(resetButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém 
  um link de navegação para exibir detalhes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toHaveAttribute('href', pokemonLink);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito 
  o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(pokemonLink);
    const pokemonName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(pokemonLink);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const favoritedPokemoncheck = screen.getByText(/pokémon favoritado\?/i);
    expect(favoritedPokemoncheck).toBeInTheDocument();

    userEvent.click(favoritedPokemoncheck);
    const favoriteStar = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar).toBeInTheDocument();
  });
});
