/// <reference path="./polyfill-declare.ts" />
import { isEqual } from './index';

Object.defineProperty(ArrayBuffer, 'isEqual', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: isEqual,
});
