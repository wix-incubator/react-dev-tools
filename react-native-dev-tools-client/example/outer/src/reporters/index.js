import ConsoleReporter from './ConsoleReporter';

export function register(sendFn) {
  ConsoleReporter.create(sendFn);
}
