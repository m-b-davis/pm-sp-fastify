import { getFavourites, getIsFavourite, toggleFavourite } from './local-storage';
import { SearchResult } from 'src/api/types';
import { mockFavourites } from 'src/test/mocks';

describe('Local Storage Utils', () => {
  describe('getFavourites()', () => {
    it('should return empty array when favourites do not exist', () => {
      const getItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      expect(getFavourites()).toEqual([]);
      expect(getItem).toHaveBeenCalledWith('favourites');
    });

    it('should parse and return favourites when favourites exist', () => {
      const getItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockFavourites));
      expect(getFavourites()).toEqual(mockFavourites);
      expect(getItem).toHaveBeenCalledWith('favourites');
    });
  });

  describe('getIsFavourite()', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockFavourites));
    });

    it('should return false if result not in favourites', () => {
      const result: SearchResult = {
        name: 'foo-two',
        description: 'foo-two desc',
      };

      expect(getIsFavourite(result, mockFavourites)).toEqual(false);
    });

    it('should return true if result in favourites', () => {
      const result: SearchResult = {
        name: 'foo',
        description: 'foo-two desc',
      };

      expect(getIsFavourite(result, mockFavourites)).toEqual(true);
    });
  });

  describe('toggleFavourite', () => {
    let setItem: jest.SpyInstance;

    beforeEach(() => {
      setItem = jest.spyOn(Storage.prototype, 'setItem');
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockFavourites));
    });

    it('should add favourite if item not in favourites', () => {
      const result: SearchResult = {
        name: 'foo-two',
        description: 'foo-two desc',
      };

      toggleFavourite(result);

      const nextFavourites = JSON.stringify([...mockFavourites, result]);

      expect(setItem).toHaveBeenCalledWith('favourites', nextFavourites);
    });

    it('should remove favourite if item not in favourites', () => {
      const result: SearchResult = {
        name: 'foo',
        description: 'foo-two desc',
      };

      toggleFavourite(result);

      const nextFavourites = JSON.stringify([mockFavourites[1]]);

      expect(setItem).toHaveBeenCalledWith('favourites', nextFavourites);
    });
  });
});
