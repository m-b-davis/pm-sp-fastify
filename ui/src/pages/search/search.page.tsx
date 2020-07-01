import React from 'react';
import { SearchForm } from 'src/components';
import { RouteComponentProps, navigate } from '@reach/router';
import { createInfoRoute } from 'src/App';

export default function SearchPage(_: RouteComponentProps) {
  const handleSearch = (searchTerm: string) => {
    const nextRoute = createInfoRoute(searchTerm);
    navigate(nextRoute);
  };

  return (
    <>
      <p>Shakespeare Pokemon Search</p>
      <h1>Enter Pokemon Name!</h1>
      <SearchForm onSearch={handleSearch} />
    </>
  );
}
