import color from './utils/color.ts';
import { setBaseURL } from './utils/baseURL.ts';
import { fetchJSON } from './utils/fetchJSON.ts';
import { fetchXML } from './utils/fetchXML.ts';
import { formatDuration } from './utils/formatDuration.ts';
import { printJunitTestsuites } from './utils/printJunitTestsuites.ts';
import { printCypressReport } from './utils/printCypressReport.ts';

setBaseURL('https://gcsweb-ci.apps.ci.l2s4.p1.openshiftapps.com/gcs/origin-ci-test/pr-logs/pull/openshift_console/12343/pull-ci-openshift-console-master-e2e-gcp-console/1600112278504476672/');

if (true) {
  console.log('Analyze', color.blue('prowjob.json'));
  const prowjobJSON = await fetchJSON('prowjob.json')
  console.log('  timeout:', color.green(prowjobJSON.spec.decoration_config.timeout));
  console.log('  grace_period:', color.green(prowjobJSON.spec.decoration_config.grace_period));
  console.log('  pendingTime:', color.green(prowjobJSON.status.pendingTime));
  console.log('  startTime:', color.green(prowjobJSON.status.startTime));
  console.log('  completionTime:', color.green(prowjobJSON.status.completionTime));

  if (prowjobJSON.status.startTime && prowjobJSON.status.completionTime) {
    const startTime = new Date(prowjobJSON.status.startTime);
    const completionTime = new Date(prowjobJSON.status.completionTime);
    const duration = completionTime.getTime() - startTime.getTime();
    console.log('  duration:', formatDuration(duration / 1000));
  }

  console.log('');
}

if (true) {
  console.log('Analyze', color.blue('clone-records.json'));
  const cloneRecords = await fetchJSON('clone-records.json')
  // console.log(cloneRecords);
  cloneRecords.forEach((cloneRecord, cloneRecordIndex) => {
    // console.log(cloneRecord);
    console.log(
      `  #${cloneRecordIndex + 1}`,
      cloneRecord.refs.repo,
    );
    cloneRecord.commands?.forEach((command, commandIndex) => {
      console.log(
        `    ${commandIndex + 1}`,
        formatDuration(command.duration / 1000000000), // guessed
        command.command,
      );
    });
  });
  console.log('');
}

if (true) {
  console.log('Analyze', color.blue('junit_operator.xml'));
  const xmlRoot = await fetchXML('artifacts/junit_operator.xml')
  // console.log(JSON.stringify(xmlRoot, null, 2));
  printJunitTestsuites(xmlRoot);
  console.log('');
}

if (true) {
  console.log('Analyze', color.blue('junit_protractor.xml'));
  const xmlRoot = await fetchXML('artifacts/e2e-gcp-console/test/artifacts/gui_test_screenshots/junit_protractor.xml')
  // console.log(JSON.stringify(xmlRoot, null, 2));
  printJunitTestsuites(xmlRoot);
  console.log('');
}

if (true) {
  // TODO: figure out how we can fetch all unit_cypress files. And if this contain the same infos as below.
  console.log(color.blue('junit_cypress-96af497473687bb02cf44fe93a52e0b0.xml'));
  const xmlRoot = await fetchXML('artifacts/e2e-gcp-console/test/artifacts/gui_test_screenshots/junit_cypress-96af497473687bb02cf44fe93a52e0b0.xml')
  // console.log(JSON.stringify(xmlRoot, null, 2));
  printJunitTestsuites(xmlRoot);
  console.log('');
}

if (true) {
  // TODO: figure out how we can fetch all cypress reports (filenames) dynamically
  const filenames = [
    'cypress.json',
    'cypress_report.json',
    'cypress_report_001.json',
    'cypress_report_002.json',
    'cypress_report_003.json',
    'cypress_report_004.json',
    'cypress_report_005.json',
    'cypress_report_006.json',
    'cypress_report_007.json',
    'cypress_report_008.json',
    'cypress_report_009.json',
    'cypress_report_010.json',
    'cypress_report_011.json',
    'cypress_report_012.json',
    'cypress_report_013.json',
    'cypress_report_014.json',
    'cypress_report_015.json',
    'cypress_report_016.json',
    'cypress_report_017.json',
    'cypress_report_018.json',
    'cypress_report_019.json',
    'cypress_report_020.json',
    'cypress_report_021.json',
    'cypress_report_022.json',
    'cypress_report_023.json',
    'cypress_report_024.json',
    'cypress_report_025.json',
    'cypress_report_devconsole.json',
    'cypress_report_helm.json',
    'cypress_report_knative.json',
    'cypress_report_olm.json',
    'cypress_report_olm_001.json',
    'cypress_report_olm_002.json',
    'cypress_report_olm_003.json',
    'cypress_report_olm_004.json',
    'cypress_report_olm_005.json',
    'cypress_report_olm_006.json',
    'cypress_report_olm_007.json',
    'cypress_report_pipelines.json',
    'cypress_report_topology.json',
  ]
  for await (const filename of filenames) {
    console.log('Analyze', color.blue(filename));
    const cypressReport = await fetchJSON(`artifacts/e2e-gcp-console/test/artifacts/gui_test_screenshots/${filename}`)
    printCypressReport(cypressReport);
    console.log('');
  }
}
