import chalk from 'chalk';
import { formatDuration } from './formatDuration.ts';

export const printJunitTestsuites = (testsuitesRoot: { time: number, testsuite: any[] }) => {
  // TODO protractor time / 3600
  console.log(
    `  Testsuites overall`,
    chalk.red(formatDuration(testsuitesRoot.time)),
  );

  testsuitesRoot.testsuite.forEach((testsuite, testsuiteIndex) => {
    console.log(
      `    Testsuite #${testsuiteIndex + 1}`,
      chalk.blue(testsuite.name),
      chalk.red(formatDuration(testsuite.time)),
    );

    testsuite.testcase?.forEach((testcase, testcaseIndex) => {
      console.log(
        `      #${testcaseIndex + 1}`,
        chalk.blue(testcase.name),
        chalk.red(formatDuration(testcase.time)),
      );
    });
  });
}
