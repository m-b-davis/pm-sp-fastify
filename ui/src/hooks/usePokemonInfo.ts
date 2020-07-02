import { useState, useEffect } from 'react';

export type SearchResult = {
  name: string;
  description: string;
};

export enum ApiStatus {
  Ready,
  Loading,
  Success,
  Error,
}

type Options = {
  delayRequestMs?: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Hook which fetches shakespearian translation for a given pokemonName
 * @param pokemonName Name of pokemon to fetch translation for
 * @param options Configuration options for hook (see Config)
 */
export function usePokemonInfo(pokemonName: string | undefined, options?: Options) {
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.Ready);

  useEffect(() => {
    async function fetchPokemonInfo(pokemonName?: string) {
      if (pokemonName !== undefined) {
        setApiStatus(ApiStatus.Loading);
        const url = `http://0.0.0.0:9191/pokemon/${pokemonName}`;

        if (options && options.delayRequestMs) {
          // Delay for visual effect
          await delay(options.delayRequestMs);
        }

        const result = await fetch(url);

        if (result.ok) {
          const json = await result.json();
          setSearchResult(json);
          setApiStatus(ApiStatus.Success);
        } else {
          setApiStatus(ApiStatus.Error);
        }
      }
    }

    fetchPokemonInfo(pokemonName);
  }, [pokemonName, options]);

  return [searchResult, apiStatus];
}
