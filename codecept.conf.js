require('./e2e/bootstrap');
const reportDir = './e2e/output/';

exports.config = {
  output: reportDir,
  helpers: {
    Puppeteer: {
      chrome: {
        args: ['--disable-setuid-sandbox', '--no-sandbox'],
        devtools: false,
        slowMo: 0
      },
      restart: false,
      windowSize: '1024x768',
      show: process.env.PUPPETEER_SHOW,
      url: 'http://localhost:4200',
      waitForAction: 2000,
      waitForNavigation: 'networkidle0',
      waitForTimeout: 5000,
      fullPageScreenshots: true,
      getPageTimeout: 150000,
      uniqueScreenshotNames: true,
      keepBrowserState: true
    }
  },
  gherkin: {
    features: './e2e/features/*.feature',
    steps: ['./e2e/step_definitions/steps.js']
  },
  mocha: {
    /* Why like this: https://www.npmjs.com/package/mocha-multi#using-mocha-multi-programmatically */
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true
        }
      },
      mochawesome: {
        stdout: `${reportDir}console.log`,
        options: {
          /* More options: https://github.com/adamgruber/mochawesome-report-generator#options */
          reportDir,
          reportFilename: 'index'
        }
      }
    }
  },
  teardown: null,
  hooks: [],
  tests: './e2e/**/*.e2e-spec.ts',
  timeout: 10000,
  name: 'angular-ngrx-starter'
};
