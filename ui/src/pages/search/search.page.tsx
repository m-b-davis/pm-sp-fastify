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
      {/* <h3>Shakespeare Pokemon Search</h3> */}
      <h2>Shakespeare-ify</h2>
      <h3>Enter Pokemon Name:</h3>
      <br />
      <br />

      <SearchForm onSearch={handleSearch} />
    </>
  );
}
