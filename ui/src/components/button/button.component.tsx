import React, { PropsWithChildren } from 'react';
import styles from './button.module.scss';
import { join } from 'src/utils';

type Props = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  icon?: string;
  isSmall?: boolean;
  type?: 'primary' | 'secondary';
}>;

export const Button = ({ className, children, onClick, icon, isSmall, type = 'primary' }: Props) => {
  const classes = join(className, styles.button, isSmall ? styles.small : undefined, styles[type]);

  return (
    <button className={classes} onClick={onClick}>
      <span>
        {icon && <i className={join('fa', `fa-${icon}`)}></i>}
        {children}
      </span>
    </button>
  );
};
