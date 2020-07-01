import React, { ChangeEventHandler } from 'react';
import styles from './input.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function Input(props: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange(event.target.value);
  };

  return <input className={styles.input} value={props.value} onChange={handleChange}></input>;
}
