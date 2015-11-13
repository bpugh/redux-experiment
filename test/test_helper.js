import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {is as immutableIs} from 'immutable';

import assert from 'assert';
assert.is = function(actual, expected, message) {
  if (!immutableIs(actual, expected)) {
    message = `\n${actual} is not\n${expected}`;
    assert.fail(actual, expected, message, "is");
  }
};
chai.use(chaiImmutable);
