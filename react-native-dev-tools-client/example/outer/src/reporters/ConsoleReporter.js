import _ from 'lodash';
import Reporter from './Reporter';

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
      this.report('error', format(args));
    };

    console.warn = (...args) => {
      warn.apply(console, args);
      this.report('warn', format(args));
    };

    console.log = (...args) => {
      log.apply(console, args);
      this.report('log', format(args));
    };
  }
}

function format(args) {
  const message = generateMessage(args);
  const stacktrace = generateStacktrace();
  return {message, stacktrace};
}

function generateMessage(args) {
  return args ? args.join(', ') : 'undefined';
}

function generateStacktrace() {
  return new Error().stack;
}
