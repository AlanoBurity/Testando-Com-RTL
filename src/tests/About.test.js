import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWhithRouter';

describe(' Teste o componente <About.js />', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const capturarAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(capturarAbout);
    const pageHeading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(pageHeading).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pOne = screen.getByText(/this application simulates a pokédex,/i);
    const pTwo = screen.getByText(/one can filter pokémons by type,/i);
    expect(pOne).toBeInTheDocument();
    expect(pTwo).toBeInTheDocument();
  });
  test(' Se a página contém a imagem especificada de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
