import {render, query} from '../../test_utils';
import StackTrace from './StackTrace';
import {Simulate} from 'react-addons-test-utils';

describe('StackTrace', function () {
  const exampleStacktrace = [{
    file: 'some/path/to/js/file.js',
    methodName: "generate",
    lineNumber: 4,
    column: 10
  }];

  it('should not show any lines initially', function () {
    const element = render(StackTrace, {
      stacktrace: exampleStacktrace
    });
    expect(query(element, '.StackTrace li').length).toBe(0);
  });

  it('should render a message', function () {
    const element = render(StackTrace, {
      opened: true,
      stacktrace: exampleStacktrace
    });
    expect(query(element, '.StackTrace li')[0].textContent)
      .toBe('some/path/to/js/file.js:4:10 generate()');
  });

  it('should render messages on expand', function () {
    const element = render(StackTrace, {
      stacktrace: exampleStacktrace
    });
    Simulate.click(query(element, '.StackTrace-expand')[0]);
    expect(query(element, '.StackTrace li')[0].textContent)
      .toBe('some/path/to/js/file.js:4:10 generate()');
  });

  it('should shorten filenames', function () {
    const element = render(StackTrace, {
      opened: true,
      stacktrace: [
        {file: 'some/node_modules/module/index.js'},
        {file: 'some/src/index.js'}
      ]
    });
    expect(query(element, '.StackTrace li').map(el => el.textContent)).toEqual([
      'node_modules/module/index.js:: ()',
      'src/index.js:: ()'
    ]);
  });
});
