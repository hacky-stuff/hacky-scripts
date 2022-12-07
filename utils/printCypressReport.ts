import chalk from 'chalk';
import { formatDuration } from './formatDuration.ts';

export const printCypressReport = (cypressReport) => {
  // console.log(cypressReport);
  console.log(
    `  Cypress report`,
    cypressReport.stats.start,
    cypressReport.stats.end,
    formatDuration(cypressReport.stats.duration / 1000),
  );
  cypressReport.results.forEach((result) => {
    const resultDuration = result.suites.reduce((acc, suite) => {
      const suiteDuration = suite.tests.reduce((acc, test) => acc + test.duration, 0);
      return acc + suiteDuration;
    }, 0);
    console.log(
      `    ${result.file}`,
      formatDuration(resultDuration / 1000),
    );

    result.suites.forEach((suite) => {
      const suiteDuration = suite.tests.reduce((acc, test) => acc + test.duration, 0);
      console.log(
        `      ${suite.title}`,
        formatDuration(suiteDuration / 1000),
      );

      suite.tests.forEach((test) => {
        console.log(
          `        ${test.title}`,
          formatDuration(test.duration / 1000),
        );
      });
    });
  });
}
