import { assertEquals } from 'https://deno.land/std@0.165.0/testing/asserts.ts';
import color from './color.ts';
import { formatDuration } from './formatDuration.ts';

Deno.test(function testNull() {
  assertEquals(formatDuration(null as unknown as number), '');
});

Deno.test(function testUndefined() {
  assertEquals(formatDuration(undefined as unknown as number), '');
});

Deno.test(function testNaN() {
  assertEquals(formatDuration(NaN), '');
});

Deno.test(function testSeconds() {
  assertEquals(formatDuration(0), color.green('0s'));
  assertEquals(formatDuration(1), color.green('1s'));
  assertEquals(formatDuration(-1), color.green('-1s'));
});

Deno.test(function testMinutes() {
  assertEquals(formatDuration(60), color.yellow('1m 0s'));
  assertEquals(formatDuration(62), color.yellow('1m 2s'));
  assertEquals(formatDuration(-60), color.yellow('-1m 0s'));
  assertEquals(formatDuration(-62), color.yellow('-1m 2s'));
});

Deno.test(function testHours() {
  assertEquals(formatDuration(3600), color.red('1h 0m 0s'));
  assertEquals(formatDuration(3720), color.red('1h 2m 0s'));
  assertEquals(formatDuration(3723), color.red('1h 2m 3s'));
  assertEquals(formatDuration(-3600), color.red('-1h 0m 0s'));
  assertEquals(formatDuration(-3720), color.red('-1h 2m 0s'));
  assertEquals(formatDuration(-3723), color.red('-1h 2m 3s'));
});
