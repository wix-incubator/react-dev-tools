import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import './AppStateView.css';

export default class AppStateView extends PureComponent {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this); 
  }

  render() {
    return (
      <div className="AppStateView">
        <JSONTree data={this.props.appState} />
        <button onClick={this.onClick}>Update</button>
      </div>
    );
  }

  onClick() {
    this.props.send({
      type: 'request-state-update'
    });
  }
}
