'use strict';

const hippie = require('hippie');
const chai = require('chai');
const expect = chai.expect;
const host = 'https://api-dev.polimetla.de';
const url = host + '/device';
const userAgent = 'IntegrationTest';
let apiKey = 

describe('Test GET Trips API', function () { 

  it('get-trips success', (done) => {
    try {
      hippie(api)
        .get(url)
        .header('x-api-key', apiKey)
        .header('Authorization', jwtHeader)
        .header('User-Agent', userAgent)
        .qs({tags: 'Top'})
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

  it('verifies response for no api key', (done) => {
    try {
      hippie(api)
        .get(url)
        .header('Authorization', jwtHeader)
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

  it('verifies response for authorization error', (done) => {
    try {
      hippie(api)
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

  it('verifies response for POST method not defined', (done) => {
    try {
      hippie(api)
        .post(url)
        .header('x-api-key', apiKey)
        .header('Authorization', jwtHeader)
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

  it('verifies response for PUT method not defined', (done) => {
    try {
      hippie(api)
        .put(url)
        .header('x-api-key', apiKey)
        .header('Authorization', jwtHeader)
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

  it('verifies response for DELETE method not defined', (done) => {
    try {
      hippie(api)
        .del(url)
        .header('x-api-key', apiKey)
        .header('Authorization', jwtHeader)
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

  it('verifies response for invalid path', (done) => {
    try {
      hippie(api)
        .del(host + '/content/something')
        .header('x-api-key', apiKey)
        .header('Authorization', jwtHeader)
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