# proposal-arraybuffer-equals

This is a proposal to add a new method, `ArrayBuffer.isEquals(a: ArrayBuffer, b: ArrayBuffer)`,
to JavaScript's `ArrayBuffer` class.

It has not yet been presented to the JavaScript standards committee.

## The problem

```typescript
const encoder = new TextEncoder();
const input = 'sample';
const a = encoder.encode(input);
const b = encoder.encode(input);
console.log(a === b); // returns false
console.log(a == b); // returns false
```

If the re-definition [Abstract Equality Comparison](https://tc39.es/ecma262/#sec-abstract-equality-comparison) or [Strict Equality Comparison](https://tc39.es/ecma262/#sec-strict-equality-comparison) is break change behavior.

So we need to **define a new method**.

## How compare two ArrayBuffer object is equality

To solve this problem, you need to define a method.

```typescript
// The is TypeScript code
function isEquals(a: ArrayBuffer, b: ArrayBuffer) {
  if (!(a instanceof ArrayBuffer)) {
    return false;
  } else if (!(b instanceof ArrayBuffer)) {
    return false;
  } else if (a === b) {
    return true;
  } else if (a.byteLength !== b.byteLength) {
    return false;
  }
  const view1 = new DataView(a);
  const view2 = new DataView(b);
  for (let i = 0; i < view1.byteLength; i++) {
    if (view1.getUint8(i) !== view2.getUint8(i)) {
      return false;
    }
  }
  return true;
}
```

## `ArrayBuffer.isEquals`

To do this, we propose a new method, `ArrayBuffer.isEquals(a, b)`, which compare two array buffer is equality (bit-wise)

```typescript
// returns false
ArrayBuffer.isEquals(Uint8Array.of(0).buffer, undefined);
// returns false
ArrayBuffer.isEquals(Uint8Array.of(0).buffer, null);
// returns false
ArrayBuffer.isEquals(Uint8Array.of(0).buffer, Uint8Array.of(0, 1).buffer);
// returns true
ArrayBuffer.isEquals(Uint8Array.of(0).buffer, Uint8Array.of(0).buffer);
// returns true
ArrayBuffer.isEquals(
  Uint32Array.from([Number.MAX_SAFE_INTEGER]).buffer,
  Uint8Array.of(255, 255, 255, 255).buffer,
);
```

## Related discussion

- <https://es.discourse.group/t/compare-two-arraybuffers-bit-wise-for-equality/413>
