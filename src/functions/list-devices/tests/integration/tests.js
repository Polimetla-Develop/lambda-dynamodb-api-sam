'use strict';

const hippie = require('hippie');
const chai = require('chai');
const expect = chai.expect;
const host = 'https://api-dev.polimetla.de';
const url = host + '/device';
const userAgent = 'IntegrationTest';
const apiKey = 'BKAPpd71Jc5NDPfmdWkZD5kOJOI1swAa44Uue8z1';

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
          console.log(body);
          done();
        });
    } catch (err) {
      done(err);
    }
  });

  it('verifies response for no api key', (done) => {
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
});
