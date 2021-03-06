import { SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
const { AwesomeReport } = require('jasmine-awesome-report');

export let reporter = () => {
  jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    }
  }));

  const config = {
    fullPath: 'awesome-report',
    fileName: 'report',
    merge: true
  };

  jasmine.getEnv().addReporter(AwesomeReport.getReport(config));
};
