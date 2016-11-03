import * as url from 'url';
import _ from 'lodash';
import Reporter from './Reporter';
import {NativeAppEventEmitter} from 'react-native';

export default class NetworkReporter extends Reporter {
  getType() {
    return 'network';
  }

  register() {
    NativeAppEventEmitter.addListener('NetworkInterceptor', (req) => {
      if (_.isEqual(url.parse(req.url).hostname, 'localhost')) {
        return;
      }
      this.report(`from-native`, {url: req.url, method: req.method});
    });
  }

}
