import * as fp from 'fastify-plugin';
import { ShakespeareApi, PokemonApi } from 'services';
import { Errors } from 'utils';

export default fp(async (server, options, next) => {
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

        try {
          const translatedDescription = await ShakespeareApi.getShakesperianDescription(speciesInfo.description);

          return reply.send({
            ...speciesInfo,
            description: translatedDescription,
          });
        } catch (error) {
          return reply.code(500).send(Errors.ShakespeareApiError);
        }
      } catch (error) {
        return reply.code(500).send(Errors.PokemonApiError);
      }
    },
  });
  next();
});
