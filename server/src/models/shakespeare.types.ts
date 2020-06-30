export interface Success {
  total: number;
}

export interface Contents {
  translated: string;
  text: string;
  translation: string;
}

export interface TranslateResponse {
  success: Success;
  contents: Contents;
}
