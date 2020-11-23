import { assert } from 'chai';
import 'mocha';

import '../src/polyfill';

const fuzzBufferA = Uint8Array.of(0).buffer;
const fuzzBufferB = Uint8Array.of(0, 0).buffer;
const fuzzBufferC = Uint8Array.of(0, 1).buffer;

describe('equal', () => {
  const pairs: Array<Parameters<typeof ArrayBuffer.isEqual>> = [
    // reference equals
    [fuzzBufferA, fuzzBufferA],
    // logic equals
    [Uint8Array.of(0, 0).buffer, Uint8Array.of(0, 0).buffer],
  ];

  for (const [a, b] of pairs) {
    it(`ArrayBuffer.isEqual(${repr(a)}, ${repr(b)}) = true`, () => {
      assert.isTrue(ArrayBuffer.isEqual(a, b));
    });
  }
});

describe('not equal', () => {
  const pairs: Array<Parameters<typeof ArrayBuffer.isEqual>> = [
    // unexpected input type
    [undefined, undefined],
    [null, undefined],
    [undefined, null],
    [null, null],
    // any value is empty type
    [fuzzBufferA, null],
    [fuzzBufferA, undefined],
    [null, fuzzBufferA],
    [undefined, fuzzBufferA],
    // logic not equals
    [fuzzBufferA, fuzzBufferB],
    [fuzzBufferB, fuzzBufferC],
  ];

  for (const [a, b] of pairs) {
    it(`ArrayBuffer.isEqual(${repr(a)}, ${repr(b)}) = false`, () => {
      assert.isFalse(ArrayBuffer.isEqual(a, b));
    });
  }
});

describe('unexpected input case', () => {
  const pairs: Array<[any, any]> = [
    [1, 1],
    [Uint8Array.of(0), Uint8Array.of(0)],
    [fuzzBufferA, undefined],
    [fuzzBufferA, null],
  ];

  for (const [a, b] of pairs) {
    it(`ArrayBuffer.isEqual(${repr(a)}, ${repr(b)}) = false`, () => {
      assert.isFalse(ArrayBuffer.isEqual(a, b));
    });
  }
});

function repr(value: any) {
  if (value instanceof ArrayBuffer) {
    const view = new DataView(value);
    const items = [];
    for (let i = 0; i < view.byteLength; i++) {
      items.push(view.getUint8(i));
    }
    return `Uint8Array.of(${items.join(', ')}).buffer`;
  } else if (value instanceof Uint8Array) {
    return `Uint8Array.of(${value.join(', ')})`;
  }
  return value;
}
