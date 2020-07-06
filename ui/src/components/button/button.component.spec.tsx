import { Button } from './button.component';
import { render } from '@testing-library/react';
import React from 'react';

describe('Button', () => {
  it('should render button', async () => {
    const result = render(<Button />);
    const button = await result.findByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should add className', async () => {
    const result = render(<Button className="foo" />);
    const button = await result.findByRole('button');

    expect(button.className).toContain('foo');
  });

  it('should trigger onClick prop when clicked', async () => {
    const onClick = jest.fn();
    const result = render(<Button onClick={onClick} />);

    const button = await result.findByRole('button');
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render children', async () => {
    const textContent = 'foo';

    const result = render(
      <Button>
        <h1>{textContent}</h1>
      </Button>,
    );

    const heading = await result.findByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual(textContent);
  });
});
