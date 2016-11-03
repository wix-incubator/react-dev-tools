import React, { PureComponent } from 'react';
import moment from 'moment';
import './LogEntry.css';
import StackTrace from './StackTrace';

export default class LogEntry extends PureComponent {
  render() {
    const {module, message, type, time, stacktrace} = this.props;

    return (
      <div className={['LogEntry', 'LogEntry-' + type].join(' ')}>
        <span className="LogEntry-time" title={new Date(time).toString()}>
          {moment(time).format('MM-DD HH:mm:ss')}
        </span>
        <span className="LogEntry-module">{module}</span>
        <span className="LogEntry-message">{message}</span>
        {
          stacktrace ? <StackTrace stacktrace={stacktrace} /> : null
        }
      </div>
    );
  }
}
