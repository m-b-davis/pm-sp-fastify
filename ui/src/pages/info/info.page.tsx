import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Button, Loader } from 'src/components';
import { Route } from 'src/app.routing';

import { useState, useEffect } from 'react';
import { Config } from 'src/config';
import { SearchResult, ApiStatus } from 'src/api/types';
import { toggleFavourite, getIsFavourite, getFavourites } from 'src/utils/local-storage';
import styles from './info.module.scss';

const getUrlCreator = (baseUrl: string) => ({
  getShakespearianDescription: (pokemonName: string) => `${baseUrl}/pokemon/${pokemonName}`,
});

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
  const result = apiStatus === ApiStatus.Success ? (data as SearchResult) : undefined;
  const hasError = apiStatus === ApiStatus.Error;
  const [isFavourite, setIsFavourite] = useState(false);

  const handleSearchAgain = () => {
    navigate(Route.root);
  };

  const handleToggleFavourite = () => {
    toggleFavourite(result);
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    if (result) {
      const favourites = getFavourites();
      const isLocalStorageFavourite = getIsFavourite(result, favourites);
      setIsFavourite(isLocalStorageFavourite);
    }
  }, [result]);

  if (apiStatus === ApiStatus.Loading) {
    return <Loader />;
  }

  const SearchAgainButton = () => (
    <Button onClick={handleSearchAgain} icon="arrow-left">
      Search again?
    </Button>
  );

  return (
    <>
      {hasError && (
        <>
          <h3>Pokemon not found!</h3>
          {<SearchAgainButton />}
        </>
      )}

      {result && (
        <>
          <h1 className={styles.title}>{result.name}</h1>
          <div className={styles.description}>
            <h3>Translation:</h3>
            <hr />
            <p>{result.description}</p>
          </div>

          <div className={styles.buttonContainer}>
            {isFavourite ? (
              <Button icon="heart" type="secondary" className={styles.favouriteActive} onClick={handleToggleFavourite}>
                Remove favourite
              </Button>
            ) : (
              <Button icon="heart-o" onClick={handleToggleFavourite}>
                Add to favourites
              </Button>
            )}
            <SearchAgainButton />
          </div>
        </>
      )}
    </>
  );
}
