import got, { Response } from 'got';
import { mocked } from 'ts-jest/dist/util/testing';
import { mockAs } from 'utils';
import { Shakespeare } from 'models';
import { ShakespeareApi } from './shakespeare-api.service';

jest.mock('got');

const mockGot = mocked(got, true);

describe('Shakespeare Api Service', () => {
  describe('getShakesperianDescription', () => {
    describe('when called with input text', () => {
      const input = 'foo';
      const expected = 'bar';

      const mockResponse = mockAs<Response<Shakespeare.TranslateResponse>>({
        body: {
          contents: {
            translated: expected,
          },
        },
      });

      let result: string;

      beforeEach(async () => {
        mockGot.post.mockResolvedValue(mockResponse);
        result = await ShakespeareApi.getShakesperianDescription(input);
      });

      it('should call post with correct parameters', () => {
        expect(mockGot.post).toHaveBeenCalledWith('https://api.funtranslations.com/translate/shakespeare.json', {
          json: { text: input },
          responseType: 'json',
        });
      });

      it('should parse and return result correctly', () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
