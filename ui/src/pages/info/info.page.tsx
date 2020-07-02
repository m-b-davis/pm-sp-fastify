import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { usePokemonInfo } from 'src/hooks';
import { SearchResult, ApiStatus } from 'src/hooks/usePokemonInfo';
import { Button, Loader } from 'src/components';
import { Route } from 'src/app.routing';

export default function InfoPage(props: RouteComponentProps<{ name: string }>) {
  const [data, apiStatus] = usePokemonInfo(props.name, { delayRequestMs: 1000 });
  const result = apiStatus === ApiStatus.Success && (data as SearchResult);

  const handleSearchAgain = () => {
    navigate(Route.root);
  };

  if (apiStatus === ApiStatus.Loading) {
    return <Loader />;
  }

  const hasError = apiStatus === ApiStatus.Error;

  return (
    <>
      {hasError && <p>Pokemon not found!</p>}
      {result && (
        <>
          <h1>{result.name}</h1>
          <p>{result.description}</p>
        </>
      )}
      <Button onClick={handleSearchAgain}>Searcb again?</Button>
    </>
  );
}
