import {render, query} from '../../test_utils';
import LogEntry from './LogEntry';
import moment from 'moment';

describe('LogEntry', function () {
  it('should render message', function () {
    const element = render(LogEntry, {message: 'Hello'});
    expect(query(element, '.LogEntry-message')[0].textContent).toBe('Hello');
  });

  it('should render timestamp attribute', function () {
    const time = Date.now();
    const element = render(LogEntry, {time});
    expect(query(element, '.LogEntry-time')[0].title).toBe(new Date(time).toString());
  });

  it('should render module attribute', function () {
    const module = 'module1';
    const element = render(LogEntry, {module});
    expect(query(element, '.LogEntry-module')[0].textContent)
      .toBe(module);
  });

  it('should render readable time', function () {
    const time = Date.now();
    const element = render(LogEntry, {time});
    expect(query(element, '.LogEntry-time')[0].textContent)
      .toBe(moment(time).format('MM-DD HH:mm:ss'));
  });

  // XXX: classList, className does not work in jsdom?
  it('should set class based on type', function () {
    const element = render(LogEntry, {type: 'error'});
    expect(element.innerHTML).toContain('LogEntry-error');
  });

  it('should render stack trace', function () {
    const element = render(LogEntry, {type: 'error', stacktrace: [{}]});
    expect(query(element, '.StackTrace').length).toBe(1);
  });
});

