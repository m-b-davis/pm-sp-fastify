import React from 'react';
import nock from 'nock';
import { render, fireEvent } from '@testing-library/react';
import { navigate } from '@reach/router';
import { mocked } from 'ts-jest/dist/util/testing';

import InfoPage from './info.page';
import { Route } from 'src/app.routing';

const serverBaseUrl = 'https://foo-base-url';

jest.mock('src/config', () => ({
  get Config() {
    return {
      serverBaseUrl: 'https://foo-base-url',
    };
  },
}));

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

const mockNavigate = mocked(navigate, true);

describe('Info Page', () => {
  const pokemonName = 'foo';
  const pokemonDescription = 'foo description';

  it('should initially show loader when page is rendered', async () => {
    const result = render(<InfoPage name="foo" />);
    const loadingState = await result.findByText('Loading...');

    expect(loadingState).toBeInTheDocument();
  });

  describe('when api returns successfully', () => {
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

    it('should render result', async () => {
      const result = render(<InfoPage name="foo" />);
      const nameElement = (await result.findByRole('heading')) as HTMLHeadingElement;
      const descriptionElement = (await result.findByText(pokemonDescription)) as HTMLParagraphElement;

      expect(nameElement).toBeInTheDocument();
      expect(nameElement.textContent).toEqual(pokemonName);

      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement.textContent).toEqual(pokemonDescription);
    });

    it('should render search again button', async () => {
      const result = render(<InfoPage name="foo" />);
      const button = (await result.findByRole('button')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should navigate back to search when button clicked', async () => {
      const result = render(<InfoPage name="foo" />);
      const button = (await result.findByRole('button')) as HTMLButtonElement;

      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith(Route.root);
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
      const result = render(<InfoPage name="foo" />);
      const notFoundElement = (await result.findByText('Pokemon not found!')) as HTMLParagraphElement;

      expect(notFoundElement).toBeInTheDocument();
    });

    it('should render search again button', async () => {
      const result = render(<InfoPage name="foo" />);
      const button = (await result.findByRole('button')) as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });

    it('should navigate back to search when button clicked', async () => {
      const result = render(<InfoPage name="foo" />);
      const button = (await result.findByRole('button')) as HTMLButtonElement;

      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith(Route.root);
    });
  });
});
