import { Input } from './input.component';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

describe('Input', () => {
  it('should render input', async () => {
    const result = render(<Input />);
    const input = await result.findByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should add className', async () => {
    const result = render(<Input className="foo" />);
    const input = await result.findByRole('textbox');

    expect(input.className).toContain('foo');
  });

  it('should trigger onChange prop when input to control made', async () => {
    const onChange = jest.fn();
    const inputText = 'foo';
    const result = render(<Input onChange={onChange} />);

    const input = (await result.findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toEqual('');

    fireEvent.change(input, { target: { value: inputText } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(inputText);
  });
});
