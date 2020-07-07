import React from 'react';
import styles from './loader.module.scss';

// Adapted from https://codepen.io/internette/pen/LkBxQw

export function Loader() {
  return (
    <div className={styles.loader}>
      <h3>Loading...</h3>
      <div className={styles.normal}></div>
      <div className={styles.great}></div>
      <div className={styles.ultra}></div>
      <div className={styles.master}></div>
      <div className={styles.safari}></div>
    </div>
  );
}
