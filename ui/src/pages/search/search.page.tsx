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
      <h2>Enter Pokemon Name!</h2>
      <SearchForm onSearch={handleSearch} />
    </>
  );
}
