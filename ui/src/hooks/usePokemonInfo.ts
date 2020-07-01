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

export function usePokemonInfo(searchTerm?: string) {
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.Ready);

  useEffect(() => {
    async function fetchPokemonInfo(searchTerm?: string) {
      if (searchTerm !== undefined) {
        setApiStatus(ApiStatus.Loading);
        const url = `http://0.0.0.0:9191/pokemon/${searchTerm}`;
        const result = await fetch(url);

        console.log(result);
        if (result.ok) {
          const json = await result.json();
          setSearchResult(json);
          setApiStatus(ApiStatus.Success);
        } else {
          setApiStatus(ApiStatus.Error);
        }
      }
    }

    fetchPokemonInfo(searchTerm);
  }, [searchTerm]);

  return [searchResult, apiStatus];
}
