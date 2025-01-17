import { expect, test } from 'vitest';
import { getTokens } from './Sprintf';

test('getTokens with empty string returns empty array', () => {
  expect(getTokens('')).toEqual([]);
});
