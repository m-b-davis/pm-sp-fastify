import { SearchResult } from 'src/api/types';

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result) as T;
  }

  return defaultValue;
}

export const getIsFavourite = (result: SearchResult, favourites: SearchResult[]) => {
  return !!favourites.find((pokemon) => pokemon.name === result.name);
};

const addFavourite = (result: SearchResult, favourites: SearchResult[]) => {
  const nextFavourites = [...favourites, result];
  localStorage.setItem('favourites', JSON.stringify(nextFavourites));
};

const removeFavourite = (result: SearchResult, favourites: SearchResult[]) => {
  const nextFavourites = favourites.filter((pokemon) => pokemon.name !== result.name);
  localStorage.setItem('favourites', JSON.stringify(nextFavourites));
};

export const toggleFavourite = (result?: SearchResult) => {
  if (!result) {
    return;
  }

  const favourites = getFavourites();
  const isFavourite = getIsFavourite(result, favourites);

  if (isFavourite) {
    removeFavourite(result, favourites);
  } else {
    addFavourite(result, favourites);
  }
};

export const getFavourites = () => getFromLocalStorage<SearchResult[]>('favourites', []);
