import {render, query} from '../../test_utils';
import Log from './Log';

describe('Log', function () {
  it('should ignore unknown message type', function () {
    const entries = [{type: 'unknown'}];
    const elements = query(render(Log, {entries}), '.LogEntry-message');
    expect(elements.length).toBe(0);
  });

  it('should list complex log entry', function () {
    const entries = [{type: 'console', payload: {message: 'first!'}}];
    const elements = query(render(Log, {entries}), '.LogEntry-message').map(el => el.textContent);
    expect(elements).toEqual(['first!']);
  });

  it('should render network entry', function () {
    const entries = [{type: 'network', payload: {url: 'schema://smth/', method: 'ABC'}}];
    const elements = query(render(Log, {entries}), '.LogEntry-message').map(el => el.textContent);
    expect(elements).toEqual(['ABC schema://smth/']);
  });
});
