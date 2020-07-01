import React, { PropsWithChildren } from 'react';
import styles from './button.module.scss';
import { join } from 'src/utils';

type Props = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  danger?: boolean;
  icon?: string;
}>;

export const Button = ({ className, children, onClick, icon }: Props) => {
  const classes = join(className, styles.button);

  return (
    <button className={classes} onClick={onClick}>
      <span>
        {icon && <i className={join(styles.fa, icon)}></i>}
        {children}
      </span>
    </button>
  );
};
