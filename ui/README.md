# Shakespearify Front-End
This is the front end of the app. This was written with TypeScript and React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites
 - Node (v12 recommended) [Get node link](https://nodejs.org/en/ "Get Node")
 - To run with docker (optional):
  - Docker:  [Get docker link](https://docs.docker.com/get-docker/ "Get Docker") 

### Running the app in development mode
 - It is recommended that you run the `run.sh` script in the root of this repo. This takes care of setting up environment variables, as well as installing the dependencies
 - If you don't want to do that - make sure you create an .env file with the following values (you can tweak specific values as required)

```
API_SERVER_PORT=9191
PORT=4000
REACT_APP_API_SERVER_HOST="http://localhost:9191"
```

 - `npm install` to install dependencies
 - `npm start` to start the app in development mode
 - You can now access the site at http://localhost:<PORT> (default 4000)

### Running in Docker container (production)
 - Run `docker build . -t <TAGNAME>` where <TAGNAME> is a tag for your image so you can identify it later
 - Run `docker run -p <PORT>:4000 -d <TAGNAME>` where <TAGNAME> is the tag from the first step, and <PORT> is the port you want to be able to access the site
 - You can now access the site at http://localhost:<PORT>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs the linter to determine whether any linter issue are present

### `npm run lint:fix`

Runs the linter to determine whether any linter issue are present, and then tries to automatically fix them where possible
