import got, { Response } from 'got';
import { mocked } from 'ts-jest/dist/util/testing';
import { mockAs } from 'utils';
import { Pokemon } from 'models';
import { PokemonApi } from './pokemon-api.service';

jest.mock('got');

const mockGot = mocked(got, true);

describe('Pokemon Api Service', () => {
  describe('getPokemonInfo', () => {
    describe('when response does not contain emerald', () => {
      const input = 'foo';
      const expected = {
        name: 'foo-name',
        description: 'fire-red-foo',
      };

      const mockResponse = mockAs<Response<Pokemon.SpeciesResponse>>({
        body: {
          name: expected.name,
          flavor_text_entries: [
            {
              version: {
                name: 'fire-red',
              },
              flavor_text: expected.description,
            },
            {
              version: {
                name: 'leaf-green',
              },
              flavor_text: 'leaf-green-foo',
            },
          ],
        },
      });

      let result: typeof expected;

      beforeEach(async () => {
        mockGot.mockResolvedValue(mockResponse);
        result = await PokemonApi.getPokemonInfo(input);
      });

      it('should call post with correct parameters', () => {
        expect(mockGot).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon-species/${input}`, {
          responseType: 'json',
        });
      });

      it('should return first description', () => {
        expect(result).toEqual(expected);
      });
    });

    describe('when response contains emerald', () => {
      const input = 'foo';
      const expected = {
        name: 'foo-name',
        description: 'emerald-foo',
      };

      const mockResponse = mockAs<Response<Pokemon.SpeciesResponse>>({
        body: {
          name: expected.name,
          flavor_text_entries: [
            {
              version: {
                name: 'fire-red',
              },
              flavor_text: 'fire-foo',
            },
            {
              version: {
                name: 'emerald',
              },
              flavor_text: expected.description,
            },
          ],
        },
      });

      let result: typeof expected;

      beforeEach(async () => {
        mockGot.mockResolvedValue(mockResponse);
        result = await PokemonApi.getPokemonInfo(input);
      });

      it('should return emerald description', () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
