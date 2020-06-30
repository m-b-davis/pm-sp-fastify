import React, { ChangeEventHandler } from 'react';
import styles from './search-input.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput(props: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange(event.target.value);
  };

  return <input value={props.value} onChange={handleChange}></input>;
}
