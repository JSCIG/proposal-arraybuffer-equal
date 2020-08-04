/// <reference path="./polyfill-declare.ts" />
import { isEquals } from './index';

Object.defineProperty(ArrayBuffer, 'isEquals', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: isEquals,
});
