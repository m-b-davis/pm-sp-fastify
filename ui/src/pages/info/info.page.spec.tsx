import React from 'react';
import nock from 'nock';
import { render, fireEvent } from '@testing-library/react';
import { navigate } from '@reach/router';
import { mocked } from 'ts-jest/dist/util/testing';

import InfoPage from './info.page';
import { Route } from 'src/app.routing';
import { mockFavourites } from 'src/test/mocks';

const serverBaseUrl = process.env.REACT_APP_API_SERVER_HOST as string;

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

const mockNavigate = mocked(navigate, true);

describe('Info Page', () => {
  const pokemonName = 'foo';
  const pokemonDescription = 'foo description';

  let setLocalStorageItem: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockFavourites));
    setLocalStorageItem = jest.spyOn(Storage.prototype, 'setItem');
  });

  it('should initially show loader when page is rendered', async () => {
    const result = render(<InfoPage name={pokemonName} />);
    const loadingState = await result.findByText('Loading...');

    expect(loadingState).toBeInTheDocument();
  });

  describe('when api returns successfully and pokemon in favourites', () => {
    beforeEach(() => {
      nock(serverBaseUrl)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .get(`/pokemon/${pokemonName}`, () => true)
        .reply(200, {
          name: pokemonName,
          description: pokemonDescription,
        });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should render name and description of pokemon', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const nameElement = (await result.findByText(pokemonName)) as HTMLHeadingElement;
      const descriptionElement = (await result.findByText(pokemonDescription)) as HTMLParagraphElement;

      expect(nameElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });

    it('should render search again button', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Search again?')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should navigate back to search when button clicked', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Search again?')) as HTMLButtonElement;

      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith(Route.root);
    });

    it('should render remove favourite button when in favourites', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Remove favourite')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should write to local storage when remove favourite button clicked', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Remove favourite')) as HTMLButtonElement;
      button.click();

      const nextFavourites = [mockFavourites[1]];

      expect(setLocalStorageItem).toHaveBeenCalledWith('favourites', JSON.stringify(nextFavourites));
    });
  });

  describe('when api returns successfully and pokemon not in favourites', () => {
    const nonFavouritePokemonName = 'foo-2';

    beforeEach(() => {
      nock(serverBaseUrl)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .get(`/pokemon/${nonFavouritePokemonName}`, () => true)
        .reply(200, {
          name: nonFavouritePokemonName,
          description: pokemonDescription,
        });
    });

    it('should render add to favourites button when not in favourites', async () => {
      const result = render(<InfoPage name={nonFavouritePokemonName} />);
      const button = (await result.findByText('Add to favourites')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should write to local storage when add to favourites button clicked', async () => {
      const result = render(<InfoPage name={nonFavouritePokemonName} />);
      const button = (await result.findByText('Add to favourites')) as HTMLButtonElement;
      button.click();

      const nextFavourites = [
        ...mockFavourites,
        {
          name: nonFavouritePokemonName,
          description: pokemonDescription,
        },
      ];

      expect(setLocalStorageItem).toHaveBeenCalledWith('favourites', JSON.stringify(nextFavourites));
    });
  });

  describe('when api errors', () => {
    beforeEach(() => {
      nock(serverBaseUrl)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true',
        })
        .get(`/pokemon/${pokemonName}`, () => true)
        .reply(500);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('should render not found message', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const notFoundElement = (await result.findByText('Pokemon not found!')) as HTMLParagraphElement;

      expect(notFoundElement).toBeInTheDocument();
    });

    it('should render search again button', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Search again?')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should navigate back to search when button clicked', async () => {
      const result = render(<InfoPage name={pokemonName} />);
      const button = (await result.findByText('Search again?')) as HTMLButtonElement;

      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith(Route.root);
    });
  });
});
