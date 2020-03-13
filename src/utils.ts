import { hsl } from 'd3';

const equal = (a: any, b: any): boolean => a === b;

export const curry = (fn: (...x: any[]) => any) => {
  const r = args => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

  return (...args) => r(args);
};

export const prepend = curry((value: string, array: any[]): any[] => {
  const newArray = array.slice();
  newArray.unshift(value);
  return newArray;
});

export const head = (input: any) => input[0] || null;

export const tail = <T>(array: T[]): T[] => array.slice(1);

export const push = (value: any, array: any[]): any[] => {
  const copied = array.slice();
  copied.push(value);
  return copied;
};

export const prop = curry((name: string, object: object) => object[name]);

export const not = input => !input;

export const remove = curry((value: any, array: any[]): any[] => array.filter(x => !equal(x, value)));

type fnType = (x: any) => any;

export const compose = (...fns: fnType[]) => (value: any) => fns.reduceRight((args, fn) => fn(args), value);

export const updateAt = curry((index: number, value: any, array: any[]): any[] => {
  if (array.length <= index) {
    return updateAt(index, value, push(null, array));
  }

  return array.map((x, i) => (equal(i, index) ? value : x));
});

const notNull = (value: any): boolean => value !== null;

export const isOdd = (value: number): boolean => value % 2 !== 0;

export const makeEven = (valueToFill: any) => (array: any[]): any[] => (isOdd(array.length) ? push(valueToFill, array) : array);

export const join = (by: string) => array => array.map(a => (a.filter(notNull).length > 1 ? a.join(by) : null)).filter(notNull);

const reduce = (fn, array: number[]) => {
  if (array.length === 0) {
    return 0;
  }
  return array.reduce(fn);
};

export const max = (array: number[]): number => reduce((a, b) => Math.max(a, b), array);
// const min = (array: number[]): number => reduce((a, b) => Math.min(a, b), array);

export const maxProp = (property: string, array: object[]) => max(array.map(d => d[property]));

export const reduceAxisLabels = (width: number, values: string[]): ((label: string, index: number) => string) => {
  const spaceForText = 15;
  const ticks = width / spaceForText;

  if (values.length > ticks) {
    const x = Math.ceil(values.length / ticks);
    return (label: string, index: number): string => (index % x === 0 ? label : '');
  }
  return (label: string, index: number): string => label;
};

export const getColour = (colour: string, label?: string, filters: string[] = [], isFocused: boolean = false): string => {
  const isFiltered = filters.length > 0;
  if (isFiltered && !filters.find(f => f === label)) {
    if (isFocused) {
      return hsl('grey')
        .darker(0.5)
        .toString();
    }
    return 'grey';
  }

  if (isFocused) {
    return hsl(colour)
      .darker(0.5)
      .toString();
  }
  return colour;
};

export type Optional<T> = T | undefined;

/**
 * @param {number} value
 * @param {(value: number) => string[]} formatters needs to be in order in which we want to format the {value} first
 * @returns {string}
 */
export const tooltipFormat = (value: number, ...formatters: Array<Optional<(value: number) => string>>): string => {
  if (formatters.length === 0) {
    return `${value}`;
  }
  const formatter = head(formatters);
  return formatter ? formatter(value) : tooltipFormat(value, ...tail(formatters));
};
