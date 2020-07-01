import React, { useState } from 'react';
import { Input, Button } from '..';
import styles from './search-form.module.scss';

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
      <Input value={searchTerm} onChange={setSearchTerm} />
      <div className={styles.buttonWrapper}>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </>
  );
}
