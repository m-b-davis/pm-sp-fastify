import * as fp from 'fastify-plugin';
import { ShakespeareApi, PokemonApi } from 'services';
import { Errors } from 'utils';

export default fp(async (server, _, next) => {
  server.route({
    url: '/pokemon/:name',
    logLevel: 'warn',
    method: ['GET', 'HEAD'],
    handler: async (request, reply) => {
      const { name } = request.params;

      // Check if valid name passed
      if (['', undefined].includes(name)) {
        return reply.code(404).send(Errors.MissingName);
      }

      try {
        const speciesInfo = await PokemonApi.getPokemonInfo(name);

        try {
          const translatedDescription = await ShakespeareApi.getShakesperianDescription(speciesInfo.description);

          return reply.send({
            name: speciesInfo.name,
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
