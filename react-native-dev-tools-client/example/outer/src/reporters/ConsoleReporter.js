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

    console.error = () => {
      error.apply(console, arguments);
      this.report('error', arguments);
    };

    console.warn = () => {
      warn.apply(console, arguments);
      this.report('warn', arguments);
    };

    console.log = () => {
      log.apply(console, arguments);
      this.report('log', arguments);
    };
  }
}
