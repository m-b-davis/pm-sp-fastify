import React from 'react';
import { navigate } from '@reach/router';
import { render, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/dist/util/testing';

import SearchPage from './search.page';

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

const mockNavigate = mocked(navigate, true);

describe('Search Page', () => {
  it('should render title', async () => {
    const result = render(<SearchPage />);
    const title = await result.findByText('Shakespeare-ify');
    expect(title).toBeInTheDocument();
  });

  it('should render subtitle', async () => {
    const result = render(<SearchPage />);
    const subTitle = await result.findByText('Enter Pokemon Name:');
    expect(subTitle).toBeInTheDocument();
  });

  it('should render input with empty text', async () => {
    const result = render(<SearchPage />);
    const input = (await result.findByRole('textbox')) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('');
  });

  it('should not allow submit if text field is empty', async () => {
    const result = render(<SearchPage />);
    const input = (await result.findByRole('textbox')) as HTMLInputElement;
    const button = (await result.findByRole('button')) as HTMLButtonElement;

    expect(input.value).toEqual('');
    fireEvent.click(button);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should set value correctly when text entered', async () => {
    const result = render(<SearchPage />);
    const inputText = 'foo';

    const input = (await result.findByRole('textbox')) as HTMLInputElement;
    fireEvent.change(input, { target: { value: inputText } });

    expect(input.value).toBe(inputText);
  });

  it('should allow submit when text entered and navigate to correct page', async () => {
    const result = render(<SearchPage />);
    const inputText = 'foo';

    const input = (await result.findByRole('textbox')) as HTMLInputElement;
    const button = (await result.findByRole('button')) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(`/pokemon/${inputText}`);
  });
});
