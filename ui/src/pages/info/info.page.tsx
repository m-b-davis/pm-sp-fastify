import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Button, Loader } from 'src/components';
import { Route } from 'src/app.routing';

import { useState, useEffect } from 'react';
import { Config } from 'src/config';

const getUrlCreator = (baseUrl: string) => ({
  getShakespearianDescription: (pokemonName: string) => `${baseUrl}/pokemon/${pokemonName}`,
});

type SearchResult = {
  name: string;
  description: string;
};

enum ApiStatus {
  Ready,
  Loading,
  Success,
  Error,
}

type Options = {
  delayRequestMs?: number;
  baseUrl?: string;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Hook which fetches shakespearian translation for a given pokemonName
 * @param pokemonName Name of pokemon to fetch translation for
 * @param options Configuration options for hook (see Config)
 */
function usePokemonInfo(pokemonName: string | undefined, options?: Options) {
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>(ApiStatus.Ready);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchPokemonInfo(pokemonName?: string) {
      if (pokemonName === undefined) {
        return;
      }
      setApiStatus(ApiStatus.Loading);

      const urlCreator = getUrlCreator(options?.baseUrl || Config.serverBaseUrl);
      const url = urlCreator.getShakespearianDescription(pokemonName);

      if (options?.delayRequestMs) {
        // Delay for visual effect
        await delay(options.delayRequestMs);
      }

      try {
        const result = await fetch(url, { signal: abortController.signal });

        if (result.ok) {
          const json = await result.json();
          setSearchResult(json);
          setApiStatus(ApiStatus.Success);
        } else {
          setApiStatus(ApiStatus.Error);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setApiStatus(ApiStatus.Error);
        }
      }
    }

    fetchPokemonInfo(pokemonName);

    return () => {
      abortController.abort();
    };
  }, [pokemonName, options?.delayRequestMs, options?.baseUrl]);

  return [searchResult, apiStatus];
}

export default function InfoPage(props: RouteComponentProps<{ name: string }>) {
  const [data, apiStatus] = usePokemonInfo(props.name, { delayRequestMs: 1000 });
  const result = apiStatus === ApiStatus.Success && (data as SearchResult);
  const hasError = apiStatus === ApiStatus.Error;

  const handleSearchAgain = () => {
    navigate(Route.root);
  };

  if (apiStatus === ApiStatus.Loading) {
    return <Loader />;
  }

  return (
    <>
      {hasError && <p>Pokemon not found!</p>}
      {result && (
        <>
          <h1>{result.name}</h1>
          <p>{result.description}</p>
        </>
      )}
      <Button onClick={handleSearchAgain}>Search again?</Button>
    </>
  );
}
