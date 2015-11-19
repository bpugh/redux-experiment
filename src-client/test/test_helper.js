import jsdom from 'jsdom';
import {is as immutableIs} from 'immutable';

import assert from 'assert';
assert.is = function(actual, expected, message) {
  if (!immutableIs(actual, expected)) {
    message = `\n${actual} is not\n${expected}`;
    assert.fail(actual, expected, message, "is");
  }
};
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
