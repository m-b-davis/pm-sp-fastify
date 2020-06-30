import * as fastify from 'fastify';
import * as fastifyBlipp from 'fastify-blipp';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as cors from 'fastify-cors';

import { Config } from './config';
import pokemonRoutes from 'routes/pokemon';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(cors, {
  origin: (origin, cb) => {
    console.error(origin);
    if (/localhost/.test(origin)) {
      //  Request from localhost will pass
      cb(null, true);
      return;
    }

    cb(new Error('Not allowed'), false);
  },
});

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
