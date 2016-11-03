import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export function render(component, props) {
  const el = document.createElement('div');
  ReactDOM.render(React.createElement(component, props), el);
  return el;
}

export function query(el, selector) {
  return [].slice.call(el.querySelectorAll(selector));
}
