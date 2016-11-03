import React, { PureComponent } from 'react';
// import './Log.css';

class Log extends PureComponent {
  render() {
    const entries = this.props.entries || [];
    return (
      <ul>{entries.map(this.renderEntry)}</ul>
    );
  }

  renderEntry(text, i) {
    return <li key={i}>{text}</li>;
  }
}

export default Log;
