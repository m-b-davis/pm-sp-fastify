import React from 'react';
import { Button } from '../button/button.component';
import { SearchResult } from 'src/api/types';
import styles from './favourites-list.module.scss';

type Props = {
  favourites: SearchResult[];
  onSelect: (selection: SearchResult) => void;
};

export function FavouritesList(props: Props) {
  return (
    <>
      <h3>Favourites</h3>
      {props.favourites.length === 0 ? (
        <>
          <p>Favourites you add will appear here.</p>
        </>
      ) : (
        <ul className={styles.list}>
          {props.favourites.map((favourite) => {
            return (
              <li key={favourite.name}>
                <Button isSmall type="secondary" icon="arrow-circle-o-right" onClick={() => props.onSelect(favourite)}>
                  {favourite.name}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
