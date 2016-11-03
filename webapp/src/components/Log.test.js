import {render, query} from '../../test_utils';
import Log from './Log';

describe('Log', function () {
  it('should list log entries', function () {
    const entries = ['entry 1','entry 2','entry 3'];
    const elements = query(render(Log, {entries}), '.LogEntry-message').map(el => el.textContent);
    expect(elements).toEqual(entries);
  });

  it('should list complex log entry', function () {
    const entries = [{type: 'console', payload: {message: 'first!'}}];
    const elements = query(render(Log, {entries}), '.LogEntry-message').map(el => el.textContent);
    expect(elements).toEqual(['first!']);
  });
});
