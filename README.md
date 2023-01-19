# Some hacky scripts 😅

Requires 🦕 [Deno](https://deno.land/), see [Deno installation](https://deno.land/manual/getting_started/installation)

## Analyze CI job 🧐

Which test suite or case run how long? WIP!

```bash
deno run --allow-net=gcsweb-ci.apps.ci.l2s4.p1.openshiftapps.com analyze-ci-job.ts
```

## Get latest builds

```bash
deno run --allow-net=prow.ci.openshift.org latest-builds.ts

deno run --allow-net=prow.ci.openshift.org latest-builds.ts pull-ci-openshift-console-master-e2e-gcp-console

deno run --allow-net=prow.ci.openshift.org latest-builds.ts pull-ci-openshift-console-operator-master-e2e-aws-operator
```
