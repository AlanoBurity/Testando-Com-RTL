import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWhithRouter';

describe('Teste o componente not Found', () => {
  it('Teste se a página contém um heading `h2` com o texto `Page requested not found 😭`',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');

      const notFoundTitle = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(notFoundTitle).toBeInTheDocument();
    });

  it('Teste se a página mostra a imagem do pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const img = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
