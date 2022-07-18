import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWhithRouter';

describe('Teste Favorite Pokemons', () => {
  it('Teste se é exibida na tela a mensagem `No favorite pokemon found', () => {
    renderWithRouter(<App />);
    const clickFavoritePoke = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(clickFavoritePoke);
    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Verifica se é exibido os pokémons favoritos', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);

    const favoriteCheckbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteCheckbox);

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);

    const favoriteCard = screen.getByRole('link', { name: /more details/i });
    expect(favoriteCard).toBeInTheDocument();
  });
});
