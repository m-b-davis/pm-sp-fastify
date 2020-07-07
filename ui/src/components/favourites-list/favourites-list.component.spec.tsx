import { FavouritesList } from './favourites-list.component';
import React from 'react';
import { render } from '@testing-library/react';
import { mockFavourites } from 'src/test/mocks';

describe('FavouritesList', () => {
  it('should render empty state and no list when passed empty list', async () => {
    const { findByText, queryByRole } = render(<FavouritesList favourites={[]} onSelect={jest.fn()} />);
    const text = await findByText('Favourites you add will appear here.');
    const list = await queryByRole('list');

    expect(text).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });

  it('should render list when passed items', async () => {
    const { findByRole } = render(<FavouritesList favourites={mockFavourites} onSelect={jest.fn()} />);
    const list = await findByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render correct number of items', async () => {
    const { findAllByRole } = render(<FavouritesList favourites={mockFavourites} onSelect={jest.fn()} />);
    const listItems = await findAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('should render correct number of buttons', async () => {
    const { findAllByRole } = render(<FavouritesList favourites={mockFavourites} onSelect={jest.fn()} />);
    const buttons = await findAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should trigger onSelect when button clicked', async () => {
    const onSelect = jest.fn();
    const { findAllByRole } = render(<FavouritesList favourites={mockFavourites} onSelect={onSelect} />);
    const buttons = await findAllByRole('button');

    buttons[0].click();
    buttons[1].click();

    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenNthCalledWith(1, mockFavourites[0]);
    expect(onSelect).toHaveBeenNthCalledWith(2, mockFavourites[1]);
  });
});
