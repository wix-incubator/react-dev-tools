import React, { PureComponent } from 'react';
import './Log.css';
import LogEntry from './LogEntry';

export default class Log extends PureComponent {
  render() {
    const entries = this.props.entries || [];
    return (
      <ul className="Log">{entries.map(this.renderEntry)}</ul>
    );
  }

  renderEntry(entry, i) {
    if (typeof entry === 'string') {
      entry = {
        type: 'console',
        subtype: 'log',
        payload: {
          message: entry
        }
      };
    }
    return (
      <li key={i} className="Log-entry">
        <LogEntry
          type={entry.subtype}
          time={entry.time}
          message={entry.payload.message} />
      </li>
    );
  }
}
