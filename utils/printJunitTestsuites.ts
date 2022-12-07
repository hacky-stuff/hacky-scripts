import color from './color.ts';
import { formatDuration } from './formatDuration.ts';

const shouldBeAnArray = (value) =>
  !value ? [] : Array.isArray(value) ? value : [value];

export const printJunitTestsuites = (xmlRoot) => {
  // TODO protractor time / 3600
  console.log(
    `  Testsuites overall`,
    color.red(formatDuration(xmlRoot.testsuites.time)),
  );

  const testsuites = shouldBeAnArray(xmlRoot.testsuites.testsuite);
  testsuites.forEach((testsuite, testsuiteIndex) => {
    console.log(
      `    Testsuite #${testsuiteIndex + 1}`,
      color.blue(testsuite['@name']),
      color.red(formatDuration(testsuite['@time'])),
    );

    const testcases = shouldBeAnArray(testsuite.testcase);
    testcases.forEach((testcase, testcaseIndex) => {
      console.log(
        `      #${testcaseIndex + 1}`,
        color.blue(testcase['@name']),
        color.red(formatDuration(testcase['@time'])),
      );
    });
  });
};
