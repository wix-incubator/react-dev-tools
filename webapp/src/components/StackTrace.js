import React, { PureComponent } from 'react';
import './StackTrace.css';

export default class StackTrace extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {opened: !!props.opened};
    this.renderCollapse = this.renderCollapse.bind(this);
    this.renderExpand = this.renderExpand.bind(this);
  }

  render() {
    const stacktrace = this.props.stacktrace;
    const opened = this.state.opened;
    return (
      <span className='StackTrace'>
        { opened ? this.renderCollapse() : this.renderExpand() }
        { opened ? this.renderEntries(stacktrace) : null }
      </span>
    );
  }

  renderCollapse() {
    return <span className='StackTrace-collapse' onClick={() => this.setState({opened: false})}>[-]</span>;
  }

  renderExpand() {
    return <span className='StackTrace-expand' onClick={() => this.setState({opened: true})}>[+]</span>;
  }

  renderEntries(entries) {
    let fileNameSkip = 0;
    for (let i = 0 ; i < entries.length ; i++) {
      fileNameSkip = entries[i].file.indexOf('/node_modules/');
      if (fileNameSkip > -1) break;
    }
    return (<ul>{entries.map((entry, i) => this.renderEntry(fileNameSkip, entry, i))}</ul>);
  }

  renderEntry(skip, entry, i) {
    const {file, lineNumber, column, methodName} = entry;
    return (
      <li key={i} className='StackTrace-entry'>
        {file.substr(skip + 1)}:{lineNumber}:{column} {methodName}()
      </li>
    );
  }
}
