import React, { PureComponent } from 'react';
import './LogEntry.css';

export default class LogEntry extends PureComponent {
  render() {
    const {message, type, time} = this.props;

    return (
      <div className={['LogEntry', 'LogEntry-' + type].join(' ')}>
        <span className="LogEntry-time">{new Date(time).toString()}</span>
        <span className="LogEntry-message">{message}</span>
      </div>
    );
  }
}
