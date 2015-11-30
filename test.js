/*global describe, it, beforeEach, afterEach */

'use strict';

// unit test
require('should');

function add(x, y) {
  return x + y;
}

describe('add', function() {
  it('should add two numbers', function() {
    var actual = add(1, 1),
        expected = 2;
    actual.should.equal(expected);
  });
});

// Mock test
var sinon = require('sinon'),
addObject = {
  add: add,
  add3: function(x, y, z) {
    return this.add(x, this.add(y, z));
  }
};

describe('add3', function() {
  var adderMock;

  beforeEach(function() {
    adderMock = sinon.mock(addObject);
  });

  afterEach(function() {
    adderMock.restore();
  });

  it('should add three numbers', function() {
    adderMock.expects('add').twice();
    addObject.add3(1, 1, 1);
    adderMock.verify();
  });
});

// API test
var supertest = require('supertest'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    client = supertest(app);

app.post(
  '/add',
  bodyParser.json(),
  function(req, res) {
    var value = add(req.body.x, req.body.y);
    res.status(200).json({value: value});
  }
);

describe('app', function() {
  it('should add two numbers', function(done) {
    client
    .post('/add')
    .type('json')
    .send({
      x: 1,
      y: 1,
    })
    .expect(200)
    .expect(function(res) {
      res.body.value.should.equal(2);
    })
    .end(done);
  });
});
