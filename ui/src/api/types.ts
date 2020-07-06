export type SearchResult = {
  name: string;
  description: string;
};

export enum ApiStatus {
  Ready,
  Loading,
  Success,
  Error,
}
