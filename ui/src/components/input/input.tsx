import React, { ChangeEventHandler } from 'react';
import styles from './input.module.scss';
import { join } from 'src/utils';

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export function Input({ onChange, className, value }: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  const classes = join(className, styles.input);

  return <input className={classes} value={value} onChange={handleChange}></input>;
}
