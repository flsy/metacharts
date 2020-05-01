// export const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWZ00000000000000000000000000000000000');

enum LetterWidths {
  XS = 4.45,
  S = 5.39,
  M = 6.13,
  L = 7.11,
  X = 8,
  XL = 12,
}

const letter = {
  a: LetterWidths.L,
  b: LetterWidths.X,
  c: LetterWidths.L,
  d: LetterWidths.X,
  e: LetterWidths.L,
  f: LetterWidths.M,
  g: LetterWidths.X,
  h: LetterWidths.X,
  i: LetterWidths.XS,
  j: LetterWidths.S,
  k: LetterWidths.X,
  l: LetterWidths.XS,
  m: LetterWidths.XL,
  n: LetterWidths.X,
  o: LetterWidths.X,
  p: LetterWidths.X,
  q: LetterWidths.X,
  r: LetterWidths.S,
  s: LetterWidths.M,
  t: LetterWidths.XS,
  u: LetterWidths.X,
  v: LetterWidths.X,
  w: LetterWidths.XL,
  x: LetterWidths.X,
  y: LetterWidths.X,
  z: LetterWidths.L,
  ' ': LetterWidths.XS,
  '.': LetterWidths.XS,
  '1': LetterWidths.S,
};

export const textWidth = (text: string) =>
  Array.from(text).reduce<number>((all, current) => {
    return all + (letter[current] || LetterWidths.L);
  }, 0);
