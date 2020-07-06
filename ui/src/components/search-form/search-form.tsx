import React, { useState } from 'react';
import { Input, Button } from '..';
import styles from './search-form.module.scss';

type Props = {
  onSearch: (term: string) => void;
};

export function SearchForm(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm !== '') {
      props.onSearch(searchTerm);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Input
          className={styles.searchInput}
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="E.g Charizard..."
        />
        <Button className={styles.searchButton} onClick={handleSearch}>
          Go!
        </Button>
      </div>
    </>
  );
}
