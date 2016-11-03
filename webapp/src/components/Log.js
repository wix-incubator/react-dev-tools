import React, { PureComponent } from 'react';
import './Log.css';
import LogEntry from './LogEntry';

export default class Log extends PureComponent {
  render() {
    const entries = this.props.entries || [];

    return (
      <ul className="Log">
        {
          entries.filter(isKnownType).map(this.renderEntry)
        }
      </ul>
    );
  }

  renderEntry(entry, i) {
    const payload = entry.payload || {};
    return (
      <li key={i} className="Log-entry">
        <LogEntry
          type={entry.subtype}
          time={entry.time}
          message={payload.message}
          stacktrace={payload.stacktrace}
        />
      </li>
    );
  }
}

function isKnownType(entry) {
  return [
    'console'
  ].indexOf(entry && entry.type) > -1;
}
