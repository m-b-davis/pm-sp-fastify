import React from 'react';
import { SearchForm } from 'src/components';
import { navigate } from 'hookrouter';
import { createInfoRoute } from 'src/routing/router';
import { RouteComponentProps } from '@reach/router';

export default function SearchPage(_: RouteComponentProps) {
  const handleSearch = (searchTerm: string) => {
    const nextRoute = createInfoRoute(searchTerm);
    navigate(nextRoute);
  };

  return (
    <>
      Shakespeare Pokemon Search
      <SearchForm onSearch={handleSearch} />
    </>
  );
}
