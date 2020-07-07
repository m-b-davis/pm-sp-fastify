import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchForm } from './search-form';

describe('SearchForm', () => {
  it('should render textbox', async () => {
    const { findByRole } = render(<SearchForm onSearch={jest.fn()} />);
    const textbox = await findByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  it('should render button', async () => {
    const { findByRole } = render(<SearchForm onSearch={jest.fn()} />);
    const button = await findByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should not trigger onSearch when textbox is empty', async () => {
    const onSearch = jest.fn();
    const { findByRole } = render(<SearchForm onSearch={jest.fn()} />);
    const textbox = (await findByRole('textbox')) as HTMLInputElement;
    const button = await findByRole('button');

    expect(textbox.value).toEqual('');

    button.click();

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('should trigger onSearch when textbox has text', async () => {
    const onSearch = jest.fn();
    const inputText = 'foo';

    const { findByRole } = render(<SearchForm onSearch={jest.fn()} />);
    const textbox = (await findByRole('textbox')) as HTMLInputElement;

    const button = await findByRole('button');
    fireEvent.change(textbox, { target: { value: inputText } });

    button.click();

    expect(onSearch).toHaveBeenCalledWith(inputText);
  });
});
