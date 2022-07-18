import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWhithRouter from '../renderWhithRouter';

describe('Teste página About', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:',
    () => {
      renderWhithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      const about = screen.getByRole('link', { name: /about/i });
      const favoritePokes = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokes).toBeInTheDocument();
    });
  it('Teste se a aplicação é redirecionada para a página inicial, na URL `/` ',
    () => {
      const { history } = renderWhithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });

      userEvent.click(home);
      expect(history.location.pathname).toBe('/');
    });
  it(' Teste se a aplicação é redirecionada para a página de `About`',
    () => {
      const { history } = renderWhithRouter(<App />);
      const about = screen.getByRole('link', { name: /about/i });

      userEvent.click(about);
      expect(history.location.pathname).toBe('/about');
    });

  it(' Teste se a aplicação é redirecionada para a página de `Favorites`',
    () => {
      const { history } = renderWhithRouter(<App />);
      const favoritePokes = screen.getByRole('link', { name: /Favorite pokémons/i });

      userEvent.click(favoritePokes);
      expect(history.location.pathname).toBe('/favorites');
    });
});
