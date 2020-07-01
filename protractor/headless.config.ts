import { Config, browser } from 'protractor';
import { reporter } from './helpers/reporter';
export const config: Config = {
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  getPageTimeout: 30000,
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu']
    }
  }
};
