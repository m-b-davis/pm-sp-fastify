import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { usePokemonInfo } from 'src/hooks';
import { SearchResult, ApiStatus } from 'src/hooks/usePokemonInfo';

export default function InfoPage(props: RouteComponentProps<{ name: string }>) {
  const [data, apiStatus] = usePokemonInfo(props.name);
  const result = apiStatus === ApiStatus.Success && (data as SearchResult);

  return (
    <>
      <p>Pokemon name: {props.name}</p>
      {apiStatus === ApiStatus.Loading && 'Loading'}
      {result && result.name}
      {apiStatus === ApiStatus.Error && 'Not found!'}
    </>
  );
}
