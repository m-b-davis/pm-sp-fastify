import * as fastify from 'fastify';
import * as fastifyBlipp from 'fastify-blipp';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { Config } from './config';
import pokemonRoutes from './modules/routes/pokemon';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(fastifyBlipp);
server.register(pokemonRoutes);

const start = async () => {
  try {
    await server.listen(Config.port, Config.host);
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error(error);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
});

start();
