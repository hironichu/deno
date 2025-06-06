// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 23.9.0
// This file is automatically generated by `tests/node_compat/runner/setup.ts`. Do not modify this file manually.

'use strict';
const common = require('../common');

const assert = require('assert');
const { Writable } = require('stream');

const bufferBlerg = Buffer.from('blerg');
const w = new Writable();

assert.throws(
  () => {
    w.end(bufferBlerg);
  },
  {
    name: 'Error',
    code: 'ERR_METHOD_NOT_IMPLEMENTED',
    message: 'The _write() method is not implemented'
  }
);

const _write = common.mustCall((chunk, _, next) => {
  next();
});

const _writev = common.mustCall((chunks, next) => {
  assert.strictEqual(chunks.length, 2);
  next();
});

const w2 = new Writable({ write: _write, writev: _writev });

assert.strictEqual(w2._write, _write);
assert.strictEqual(w2._writev, _writev);

w2.write(bufferBlerg);

w2.cork();
w2.write(bufferBlerg);
w2.write(bufferBlerg);

w2.end();
