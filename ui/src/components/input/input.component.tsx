import React, { ChangeEventHandler } from 'react';
import styles from './input.module.scss';
import { join } from 'src/utils';

type Props = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function Input({ onChange, className, value, placeholder = '' }: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  const classes = join(className, styles.input);

  return <input placeholder={placeholder} className={classes} value={value} onChange={handleChange}></input>;
}
