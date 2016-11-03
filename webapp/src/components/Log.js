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
    const onClear = this.props.onClear;

    return (
      <div>
        <button className="Log-clear" onClick={onClear}>Clear</button>
        <ul className="Log">
          {
            entries.filter(isKnownType).map(this.renderEntry)
          }
        </ul>
      </div>
    );
  }

  renderEntry(entry, i) {
    const logEntry = this.mapEntry(entry, entry.payload || {});

    return (
      <li key={i} className="Log-entry">
        <LogEntry
          type={logEntry.subtype}
          time={logEntry.time}
          module={logEntry.module}
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
          module: payload.module || 'app',
          message: payload.message,
          stacktrace: payload.stacktrace
        };
      case 'network':
        return {
          subtype: entry.subtype,
          time: entry.time,
          module: payload.module || 'network',
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
