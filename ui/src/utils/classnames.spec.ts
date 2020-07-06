import { join } from './classnames';

describe('Classname Utils', () => {
  describe('join', () => {
    it('should return empty string when passed 0 arguments', () => {
      const result = join();
      expect(result).toEqual('');
    });

    it('should omit preceding undefined values', () => {
      const result = join(undefined, undefined, 'foo', 'bar');
      expect(result).toEqual('foo bar');
    });

    it('should omit trailing undefined values', () => {
      const result = join('foo', 'bar', undefined, undefined);
      expect(result).toEqual('foo bar');
    });

    it('should omit interspersed undefined values', () => {
      const result = join(undefined, 'foo', undefined, 'bar', undefined, undefined);
      expect(result).toEqual('foo bar');
    });
  });
});
