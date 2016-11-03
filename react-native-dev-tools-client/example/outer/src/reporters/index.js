import ConsoleReporter from './ConsoleReporter';
import NetworkReporter from './NetworkReporter';

export function register(sendFn) {
  ConsoleReporter.create(sendFn).register();
  NetworkReporter.create(sendFn).register();
}
