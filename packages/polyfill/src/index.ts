export function isEquals(
  a: ArrayBuffer | null | undefined,
  b: ArrayBuffer | null | undefined,
): boolean {
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
  let i = view1.byteLength;
  while (i--) {
    if (view1.getUint8(i) !== view2.getUint8(i)) {
      return false;
    }
  }
  return true;
}
