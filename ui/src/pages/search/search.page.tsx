import React from 'react';
import { SearchForm, FavouritesList } from 'src/components';
import { RouteComponentProps, navigate } from '@reach/router';
import { createInfoRoute } from 'src/App';
import { getFavourites } from 'src/utils/local-storage';
import { SearchResult } from 'src/api/types';

export default function SearchPage(_: RouteComponentProps) {
  const handleSearch = (searchTerm: string) => {
    const nextRoute = createInfoRoute(searchTerm);
    navigate(nextRoute);
  };

  const handleSelectFavourite = (selection: SearchResult) => {
    const nextRoute = createInfoRoute(selection.name);
    navigate(nextRoute);
  };

  const favourites = getFavourites();

  return (
    <>
      <h2>Shakespeare-ify</h2>
      <section>
        <h3>Enter Pokemon Name:</h3>
        <SearchForm onSearch={handleSearch} />
      </section>

      <section>
        <FavouritesList favourites={favourites} onSelect={handleSelectFavourite} />
      </section>
    </>
  );
}
