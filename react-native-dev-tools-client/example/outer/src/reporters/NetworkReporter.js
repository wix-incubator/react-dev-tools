import _ from 'lodash';
import Reporter from './Reporter';

export default class NetworkReporter extends Reporter {
  getType() {
    return 'network';
  }

  register() {
    this.requests = [];
    //const original = global.fetch;
    //global.fetch = (...args) => {
    //  original.apply(this, args);
    //  this.report('fetch', args);
    //};
  }

}
