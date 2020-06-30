import got from 'got';
import { Shakespeare } from 'models';

const BASE_URL = 'https://api.funtranslations.com';

const UrlCreator = {
  translate: () => `${BASE_URL}/translate/`,
};

/**
 * Calls translation API to convert text into shakespearian english
 * @param text Text to translate
 */
async function getShakesperianDescription(text: string) {
  const requestUrl = UrlCreator.translate();

  const { body } = await got.post<Shakespeare.TranslateResponse>(requestUrl, {
    searchParams: text,
    responseType: 'json',
  });

  return body.contents.translated;
}

export const ShakespeareApi = {
  getShakesperianDescription,
};
