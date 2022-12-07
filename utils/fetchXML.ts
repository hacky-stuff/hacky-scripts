import * as xml from 'https://deno.land/x/xml@2.0.4/mod.ts';
import { getBaseURL } from './baseURL.ts';

export const fetchXML = async (file: string): Promise<any> => {
  const response = await fetch(`${getBaseURL()}${file}`);
  if (response.status !== 200) {
    throw new Error(
      `Invalid status code: ${response.status} ${response.statusText}`,
    );
  }
  const text = await response.text();
  // console.log(text);

  // console.log(parse(text, { reviver: ({ value, key, tag, properties }) => {
  //   console.log('xxx', value, key, tag, properties);
  //   return value;
  // } }));

  return xml.parse(text);
};
