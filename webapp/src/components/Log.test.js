import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Log from './Log';

describe('Log', function () {
  it('should list log entries', function () {
    const entries = ['entry 1','entry 2','entry 3'];
    const elements = query(render(Log, {entries}), 'li').map(el => el.textContent);
    expect(elements).toEqual(entries);
  });
});

function render(component, props) {
  const el = document.createElement('div');
  ReactDOM.render(React.createElement(component, props), el);
  return el;
}

function query(el, selector) {
  return [].slice.call(el.querySelectorAll(selector));
}
