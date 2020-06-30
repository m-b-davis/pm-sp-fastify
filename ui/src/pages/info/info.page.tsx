import React, { useState, useEffect } from 'react';
import { InfoRouteProps } from 'src/routing';

type SearchResult = {
  name: string;
  description: string;
};

export default function InfoPage(props: InfoRouteProps) {
  const searchTerm = props.name;
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemonInfo(searchTerm?: string) {
      if (searchTerm !== undefined) {
        setIsLoading(true);
        const url = `http://0.0.0.0:3000/pokemon/${searchTerm}`;
        const result = await fetch(url);

        if (result.ok) {
          const json = await result.json();
          setSearchResult(json);
          setIsLoading(false);
        }
      }
    }

    fetchPokemonInfo(searchTerm);
  }, [searchTerm]);
  return (
    <>
      <p>Pokemon name: {props.name}</p>
      {isLoading && 'Loading'}
      {searchResult && searchResult.name}
      {searchResult && searchResult.description}
    </>
  );
}
