import Reporter from './Reporter';
import * as stacktraceGenerator from './stacktraceGenerator';

export default class ConsoleReporter extends Reporter {
  getType() {
    return 'console';
  }

  register() {
    const {
      error,
      warn,
      log
    } = console;

    console.error = (...args) => {
      error.apply(console, args);
      format(args).then((f) => this.report('error', f));
    };

    console.warn = (...args) => {
      warn.apply(console, args);
      format(args).then((f) => this.report('warn', f));
    };

    console.log = (...args) => {
      log.apply(console, args);
      format(args).then((f) => this.report('log', f));
    };
  }
}

async function format(args) {
  const message = args ? args.join(', ') : 'undefined';
  const stacktrace = await stacktraceGenerator.generate();
  return {message, stacktrace};
}

