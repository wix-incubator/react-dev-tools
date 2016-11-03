'use strict';
const expect = require('chai').expect,
  fetch = require('node-fetch'),
  testkit = require('wix-bootstrap-testkit');

describe('app', function () {
  const env = {
    PORT: 3000,
    MANAGEMENT_PORT: 3004,
    MOUNT_POINT: '/remote-dev'
  };
  testkit.server('index', {env}).beforeAndAfter();

  it('should respond to "/health/is_alive" on app port and mount point', () =>
    fetch('http://localhost:3000/remote-dev/health/is_alive').then(res => {
      expect(res.status).to.equal(200);
    })
  );

  it('should respond to "/health/deployment/test" on management app port and mount point', () =>
    fetch('http://localhost:3004/remote-dev/health/deployment/test').then(res => {
      expect(res.status).to.equal(200);
    })
  );


});