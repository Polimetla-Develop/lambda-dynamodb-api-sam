'use strict';

const hippie = require('hippie');
const chai = require('chai');
const expect = chai.expect;
const host = 'https://api-dev.polimetla.de';
const url = host + '/device';
const userAgent = 'IntegrationTest';
const apiKey = 'test1234';

describe('Test GET Devices API', function () {
  it('list-devices success', (done) => {
    try {
      hippie()
        .get(url)
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .expectStatus(200)
        .end(function (err, res, body) {
          if (err) throw err;
          expect(body).to.be.an('array');
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  xit('verifies response for no api key', (done) => {
    try {
      hippie()
        .get(url)
        .header('User-Agent', userAgent)
        .expectStatus(403)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  xit('verifies response for authorization error', (done) => {
    try {
      hippie()
        .get(url)
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .expectStatus(401)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  xit('verifies response for POST method not defined', (done) => {
    try {
      hippie()
        .post(url)
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      expect(err.message).to.contains('Swagger spec does not define method: "post" in path');
      done();
    }
  });

  xit('verifies response for PUT method not defined', (done) => {
    try {
      hippie()
        .put(url)
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      expect(err.message).to.contains('Swagger spec does not define method: "put" in path');
      done();
    }
  });

  xit('verifies response for DELETE method not defined', (done) => {
    try {
      hippie()
        .del(url)
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      expect(err.message).to.contains('Swagger spec does not define method: "delete" in path');
      done();
    }
  });

  xit('verifies response for invalid path', (done) => {
    try {
      hippie()
        .del(host + '/content/something')
        .header('x-api-key', apiKey)
        .header('User-Agent', userAgent)
        .end(function (err, res, body) {
          if (err) throw err;
          done();
        });
    } catch (err) {
      expect(err.message).to.contains('Swagger spec does not define path');
      done();
    }
  });
});
