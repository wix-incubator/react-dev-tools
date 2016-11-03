import * as timestamp from './timestamp';

export default class Reporter {
  static create(sendFn) {
    return new this(sendFn);
  }

  constructor(sendFn) {
    this.sendFn = sendFn;
  }

  register() {
    throw new Error('must implement');
  }

  getType() {
    throw new Error('must implement');
  }

  report(subtype, payload) {
    this.sendFn({type: this.getType(), subtype, time: timestamp.getTimestamp(), payload});
  }
}
