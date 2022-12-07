import { getBaseURL } from './baseURL.ts';

export const fetchJSON = async (file: string): Promise<any> => {
  const response = await fetch(`${getBaseURL()}${file}`)
  if (response.status !== 200) {
      throw new Error(`Invalid status code: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
