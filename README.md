## Shakespearify

Shakespearify transforms pokemon names into their shakesperian description.

This is a mono-repo containing both the client and server applications. These can be run standalone or within containers.

### Technologies:
 - Front-end:
   - TypeScript
   - React
   - Jest

 - Back-end:
   - TypeScript
   - Node
   - Fastify
   - Jest

- Dockerfiles for each application & docker-compose configuration for production. Here the Node server is built to remove TS, and the UI is hosted using an NGINX server.

## Setup

### Local Development Setup

#### Prerequisites
 - Node (v12 recommended) [Get node link](https://nodejs.org/en/ "Get Node")
 - To run with docker (optional):
  - Docker:  [Get docker link](https://docs.docker.com/get-docker/ "Get Docker") 
  - Docker Compose: [Get docker-compose link](https://docs.docker.com/compose/install/ "Get Docker Compose") 

#### Setup apps for development
 - Clone the repo: `git clone git@github.com:m-b-davis/pm-sp-fastify.git`
 - Run ./install.sh to set up the repo for development. This copies in env vars to each project and installs the required dependencies
 - Press `y` when prompted to copy .env files and install dependencies

If you need to change .env vars, do so in the root and then re-run this command (dependency install can be skipped in this case).

#### Running the client and server in development mode
 - In one terminal, cd into /ui and run `npm start`
 - In another terminal, cd into /server and run `npm start`
 - Now both apps should be running at `http://localhost:4000` (UI) and `http://localhost:9191`. Note that this will change if the values in .env are changed

### Running within Docker (Production)
 - Make sure both apps are not running in development mode as they will be served from the same ports
 - Go to the root folder and run ./run.sh. This will run the tests and then start docker-compose
 - Once complete, both services should be accessible at `http://localhost:4000` (UI) and `http://localhost:9191`. Note that this will change if the values in .env are changed
