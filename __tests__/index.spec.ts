import { Encoder } from '../src/index';

describe('Encoder', () => {
  describe('encode', () => {
    test('should encode string correctly', () => {
      expect(Encoder.encode('hello')).toBe('aGVsbG8=');
    });

    test('should encode object correctly', () => {
      const obj = { name: 'test', value: 123 };
      expect(Encoder.encode(obj)).toBe('eyJuYW1lIjoidGVzdCIsInZhbHVlIjoxMjN9');
    });

    test('should encode array correctly', () => {
      const arr = [1, 'test', true];
      expect(Encoder.encode(arr)).toBe('WzEsInRlc3QiLHRydWVd');
    });
  });

  describe('decode', () => {
    test('should decode string correctly', () => {
      expect(Encoder.decode('aGVsbG8=')).toBe('hello');
    });

    test('should decode JSON object correctly', () => {
      const encoded = 'eyJuYW1lIjoidGVzdCIsInZhbHVlIjoxMjN9';
      expect(Encoder.decode(encoded)).toEqual({ name: 'test', value: 123 });
    });

    test('should decode JSON array correctly', () => {
      const encoded = 'WzEsInRlc3QiLHRydWVd';
      expect(Encoder.decode(encoded)).toEqual([1, 'test', true]);
    });

    test('should return decoded string when JSON parse fails', () => {
      const encoded = 'aGVsbG8=';
      expect(Encoder.decode(encoded)).toBe('hello');
    });
  });
});
