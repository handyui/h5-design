const toString = Object.prototype.toString;

export function is(val: any, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = <T = any>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = any>(val?: T): val is T => {
  return !isDef(val);
};

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

export function isDate(val: any): val is Date {
  return is(val, 'Date');
}

export function isNull(val: any): val is null {
  return val === null;
}

export function isNumber(val: any): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: any): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: any): val is string {
  return is(val, 'String');
}

export const isFunction = (val: any): val is Function => typeof val === 'function';

export function isBoolean(val: any): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: any): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val: any): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}
