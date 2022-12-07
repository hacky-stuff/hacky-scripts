import fetch from 'node-fetch';
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';
import { getBaseURL } from './baseURL.ts';

const parseOptions: X2jOptionsOptional = {
  ignoreAttributes: false, // parse attributes
  attributeNamePrefix: '', // don't prefix attributes
  parseAttributeValue: true, // parse numbers
  isArray: (tagName, jPath, isLeafNode, isAttribute) => {
    // if (tagName.startsWith('test')) {
    //   console.log(tagName, jPath, isLeafNode, isAttribute);
    // }
    return !isAttribute && ['testsuite', 'testcase'].includes(tagName);
  },
}

export const fetchXML = async (file: string): Promise<any> => {
  const response = await fetch(`${getBaseURL()}${file}`)
  if (response.status !== 200) {
    throw new Error(`Invalid status code: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  // console.log(text);
  return new XMLParser(parseOptions).parse(text);
}
