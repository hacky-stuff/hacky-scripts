import { getBaseURL } from './baseURL.ts';

export const fetchText = async (file: string): Promise<string> => {
  const response = await fetch(`${getBaseURL()}${file}`)
  if (response.status !== 200) {
      throw new Error(`Invalid status code: ${response.status} ${response.statusText}`);
  }
  return response.text();
}
