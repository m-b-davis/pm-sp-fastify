import got from 'got';
import { Pokemon } from 'models';

const BASE_URL = 'https://pokeapi.co/api/v2';
const PREFERRED_VERSION_NAME = 'emerald';

const UrlCreator = {
  pokemonSpecies: ({ name }) => `${BASE_URL}/pokemon-species/${name}`,
};

/**
 * Gets the description text from a SpeciesResponse
 * Tries to get the version specified by PREFERRED_VERSION_NAME - or falls back to the first description
 * @param response A SpeciesRepsonse object from the pokemon api
 */
function getDescriptionText(response: Pokemon.SpeciesResponse) {
  const { flavor_text_entries } = response;

  const targetDescription = flavor_text_entries.find((entry) => entry.version.name === PREFERRED_VERSION_NAME);

  const getFlavourTextString = (entry: Pokemon.FlavorTextEntry) => entry.flavor_text;

  if (targetDescription) {
    return getFlavourTextString(targetDescription);
  }

  // Fallback to first entry
  return getFlavourTextString(flavor_text_entries[0]);
}

/**
 * Gets pokemon description by name
 * @param name Name of pokemon to get information for
 */
async function getPokemonInfo(name: string) {
  const requestUrl = UrlCreator.pokemonSpecies({ name });
  const { body } = await got<Pokemon.SpeciesResponse>(requestUrl, { responseType: 'json' });

  const response = {
    name: body.name,
    description: getDescriptionText(body),
  };

  return response;
}

export const PokemonApi = {
  getPokemonInfo,
};
