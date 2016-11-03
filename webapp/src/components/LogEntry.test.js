import {render, query} from '../../test_utils';
import LogEntry from './LogEntry';

describe('LogEntry', function () {
  it('should render message', function () {
    const element = render(LogEntry, {message: 'Hello'});
    expect(query(element, '.LogEntry-message')[0].textContent).toBe('Hello');
  });

  it('should render timestamp', function () {
    const time = Date.now();
    const element = render(LogEntry, {time});
    expect(query(element, '.LogEntry-time')[0].textContent).toBe(new Date(time).toString());
  });

  // XXX: classList, className does not work in jsdom?
  it('should set class based on type', function () {
    const element = render(LogEntry, {type: 'error'});
    expect(element.innerHTML).toContain('LogEntry-error');
  });
});
