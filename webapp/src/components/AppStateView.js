import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import _ from 'lodash';
import './AppStateView.css';

export default class AppStateView extends PureComponent {
  constructor() {
    super();

    this.state = {
      array: [1, 2, 3],
      bool: true,
      object: {
        foo: 'bar'
      }
    };
  }

  render() {
    return (
      <div className="AppStateView">
        <JSONTree data={this.state} />
      </div>
    );
  }
}
