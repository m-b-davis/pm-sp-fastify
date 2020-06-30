import * as fastify from 'fastify';
import * as nock from 'nock';
import { Server, IncomingMessage, ServerResponse } from 'http';
import pokemonRoutes from 'routes/pokemon';
import { Errors } from 'utils';

describe('/pokemon/:id', () => {
  let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

  const pokemonName = 'charizard';
  const pokemonDescription = 'foo-description';
  const shakesperianDescription = 'foo-shakespeare';

  beforeEach(async () => {
    server = fastify({});
    // eslint-disable-next-line global-require
    server.register(pokemonRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  describe('when services working correctly', () => {
    beforeEach(() => {
      nock('https://pokeapi.co')
        .get(`/api/v2/pokemon-species/${pokemonName}`, () => true)
        .reply(200, {
          name: pokemonName,
          flavor_text_entries: [
            {
              version: {
                name: 'fire-red',
              },
              flavor_text: pokemonDescription,
            },
            {
              version: {
                name: 'leaf-green',
              },
              flavor_text: 'leaf-green-foo',
            },
          ],
        });

      nock('https://api.funtranslations.com')
        .post('/translate/shakespeare.json', () => true)
        .reply(200, {
          contents: {
            translated: shakesperianDescription,
          },
        });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns 200 and correct data to a GET request with a valid pokemon name', async () => {
      const response = await server.inject({ method: 'GET', url: '/pokemon/charizard' });
      expect(response.statusCode).toEqual(200);

      const { name, description }: { name: string; description: string } = JSON.parse(response.payload);
      expect(name).toEqual(pokemonName);
      expect(description).toEqual(shakesperianDescription);
    });

    it('returns 404 to a GET request with missing pokemon name', async () => {
      const response = await server.inject({ method: 'GET', url: '/pokemon/' });
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('when pokemon service down', () => {
    beforeEach(() => {
      nock('https://pokeapi.co')
        .get(`/api/v2/pokemon-species/${pokemonName}`, () => true)
        .reply(500);

      nock('https://api.funtranslations.com')
        .post('/translate/shakespeare.json', () => true)
        .reply(200, {
          contents: {
            translated: shakesperianDescription,
          },
        });
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns 500 with error code', async () => {
      const response = await server.inject({ method: 'GET', url: '/pokemon/charizard' });
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(Errors.PokemonApiError);
    });
  });

  describe('when shakespeare translation service down', () => {
    beforeEach(() => {
      nock('https://pokeapi.co')
        .get(`/api/v2/pokemon-species/${pokemonName}`, () => true)
        .reply(200, {
          name: pokemonName,
          flavor_text_entries: [
            {
              version: {
                name: 'fire-red',
              },
              flavor_text: pokemonDescription,
            },
            {
              version: {
                name: 'leaf-green',
              },
              flavor_text: 'leaf-green-foo',
            },
          ],
        });

      nock('https://api.funtranslations.com')
        .post('/translate/shakespeare.json', () => true)
        .reply(500);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns 500 with error code', async () => {
      const response = await server.inject({ method: 'GET', url: '/pokemon/charizard' });
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(Errors.ShakespeareApiError);
    });
  });
});
