import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';

export default class AppStateView extends PureComponent {
  render() {
    const state = {
      array: [1, 2, 3],
      bool: true,
      object: {
        foo: 'bar'
      }
    };

    return (
      <div>
        <JSONTree data={state} shouldExpandNode={this.shouldExpandNode} />
      </div>
    );
  }

  shouldExpandNode(keyName, data, level) {
    return true;
  }
}
