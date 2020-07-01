import React, { PropsWithChildren } from 'react';
import styles from './base-layout.module.scss';

export const BaseLayout = (props: PropsWithChildren<unknown>) => {
  return (
    <div className={styles.baseLayout}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
