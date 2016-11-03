import React, { PureComponent } from 'react';
import './Log.css';
import LogEntry from './LogEntry';

export default class Log extends PureComponent {
  constructor(props) {
    super(props);

    this.renderEntry = this.renderEntry.bind(this);
  }

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
    const logEntry = this.mapEntry(entry, entry.payload || {});

    return (
      <li key={i} className="Log-entry">
        <LogEntry
          type={logEntry.subtype}
          time={logEntry.time}
          message={logEntry.message}
          stacktrace={logEntry.stacktrace}
        />
      </li>
    );
  }

  mapEntry(entry, payload) {
    switch (entry.type) {
      case 'console':
        return {
          subtype: entry.subtype,
          time: entry.time,
          message: payload.message,
          stacktrace: payload.stacktrace
        };
      case 'network':
        return {
          subtype: entry.subtype,
          time: entry.time,
          message: `${payload.method} ${payload.url}`
        };
      default:
        return {
          subtype: entry.subtype,
          time: entry.time
        }
    }
  }
}

function isKnownType(entry) {
  return [
    'console',
    'network'
  ].indexOf(entry && entry.type) > -1;
}
