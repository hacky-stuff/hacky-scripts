import { setBaseURL } from './utils/baseURL.ts';
import { fetchText } from './utils/fetchText.ts';
import color from './utils/color.ts';
import { formatDuration } from './utils/formatDuration.ts';

setBaseURL('https://prow.ci.openshift.org/job-history/gs/origin-ci-test/pr-logs/directory/');

interface Build {
  ID: string;
  Started: string;
  Duration: number;
  Result: 'PENDING' | 'SUCCESS' | 'FAILURE' | 'ABORTED';
  Refs: {
    pulls: {
        number: number;
    }[];
  };
}

interface PaginatedBuilds {
  builds: Build[],
  olderBuildId: string|undefined,
  newerBuildId: string|undefined,
}

const extractPaginatedBuilds = async (job: string, buildId?: string): Promise<PaginatedBuilds> => {
  const fullHTML: string = await fetchText(buildId ? `${job}?buildId=${buildId}` : job);

  const allBuildsStart = '  var allBuilds = ';
  const allBuildsEnd = ';\n';
  const allBuildsIndex = fullHTML.indexOf(allBuildsStart);

  if (allBuildsIndex === -1) {
    console.log('Full prow HTML:\n' + fullHTML);
    throw new Error('Could not find allBuilds in prow HTML!');
  }

  const allBuilds = fullHTML.substring(allBuildsIndex + allBuildsStart.length, fullHTML.indexOf(allBuildsEnd, allBuildsIndex));
  const builds = JSON.parse(allBuilds);

  const olderBuildId = fullHTML.match(/buildId=([0-9]*)">&lt;- Older Runs/)?.[1];
  const newerBuildId = fullHTML.match(/buildId=([0-9]*)">Newer Runs -&gt;/)?.[1];

  return {
    builds,
    olderBuildId,
    newerBuildId,
  };
}

const job = 'pull-ci-openshift-console-master-e2e-gcp-console';
let buildId;
const builds: Build[] = [];

for (let i = 0; i < 5; i++) {
  console.log(`Fetching page ${i + 1} with buildId`, buildId);
  const paginatedBuilds = await extractPaginatedBuilds(job, buildId);
  buildId = paginatedBuilds.olderBuildId;
  builds.push(...paginatedBuilds.builds);
}

const formatResult = (result) => {
  switch (result) {
    case 'PENDING': return color.yellow(result);
    case 'SUCCESS': return color.green(result);
    case 'FAILURE': return color.red(result);
    case 'ABORTED': return color.yellow(result);
    default: return result;
  }
}

builds.forEach((build) => {
  console.log(
    build.ID,
    new Date(build.Started),
    formatDuration(build.Duration / 1000000000),
    formatResult(build.Result),
    build.Refs.pulls.map(pull => `#${pull.number}`).join(' '),
  );
});

const success = builds.filter((build) => build.Result === 'SUCCESS').length;
const failure = builds.filter((build) => build.Result === 'FAILURE').length;
const pending = builds.filter((build) => build.Result === 'PENDING').length;
const aborted = builds.filter((build) => build.Result === 'ABORTED').length;

const successRate = Math.round(success / (success + failure) * 100) / 100;
const failureRate = Math.round(failure / (success + failure) * 100) / 100;

console.log('');
console.log(color.green(`Success rate: ${successRate} % (${success} / ${success + failure})`));
console.log(color.red(`Failure rate: ${failureRate} % (${failure} / ${success + failure})`));
if (aborted > 0) {
  console.log(color.yellow(`Aborted: ${aborted}`));
}
console.log('');
