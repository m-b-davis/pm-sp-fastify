import React, { useState } from 'react';
import { SearchInput } from '..';

type Props = {
  onSearch: (term: string) => void;
};

export function SearchForm(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}
