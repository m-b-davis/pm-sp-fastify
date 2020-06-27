import * as fp from 'fastify-plugin';
import { PokemonApi } from '../../../services';

export default fp(async (server, opts, next) => {
  server.route({
    url: '/pokemon/:name',
    logLevel: 'warn',
    method: ['GET', 'HEAD'],
    handler: async (request, reply) => {
      const { name } = request.params;

      if (name === undefined) {
        // Name not provided
        return reply.send(404);
      }

      try {
        const speciesInfo = await PokemonApi.getPokemonInfo(name);
        return reply.send(speciesInfo);
      } catch (error) {
        return reply.send(500);
      }
    },
  });
  next();
});
