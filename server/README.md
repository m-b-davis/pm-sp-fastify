# Shakespearify Server
This is the back end of the app. This was written with Node and TypeScript.

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
 - `npm start` to start the server in development mode with nodemon
 - The server is now accessible at http://localhost:<PORT> (default 9191)

### Running in Docker container (production)
 - Run `docker build . -t <TAGNAME>` where <TAGNAME> is a tag for your image so you can identify it later
 - Run `docker run -p <PORT>:9191 -d <TAGNAME>` where <TAGNAME> is the tag from the first step, and <PORT> is the port you want to be able to access the server at (9191 recommended)
 - You can now access the site at http://localhost:<PORT>

## Endpoints

**Get Pokemnon Info**
----
  When provided with a valid pokemon name, returns a name and translated shakespearian description for the pokemon

* **URL**

  /pokemon/:name

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `name=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      name : 'charizard',
      description : "A charizard flies about in search of stout opponents. 't breathes intense flames yond can melt any material. However, 'twill nev'r torch a weaker foe."
    }
    ```
 
* **Error Response:**

  Pokemon name not provided:
  * **Code:** 404 NOT FOUND <br />
    **Content:** ```"MISSING_POKEMON_NAME"```

  Pokemon api error:
  * **Code:** 500 <br />
    **Content:** ```"GET_POKEMON_ERROR"```
  
  Translation api error:
  * **Code:** 500 <br />
    **Content:** ```"GET_TRANSLATION_ERROR"```

* **Sample Call:**

  ```javascript
    fetch("/pokemon/charizard")
      .then(data => data.json)
      .then(json => console.log(json));
  ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run dev`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test`

Launches the test runner and runs all tests

### `npm test:watch`

Launches the test runner and runs all tests in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm run lint`

Runs the linter to determine whether any linter issue are present

### `npm run lint:fix`

Runs the linter to determine whether any linter issue are present, and then tries to automatically fix them where possible
