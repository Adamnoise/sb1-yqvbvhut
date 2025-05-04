import { describe, it, expect } from 'vitest';
import { toPrimitive, hasCircularReferences, removeCircularReferences } from '../utils/object-helpers';

describe('Object Helpers', () => {
  describe('toPrimitive', () => {
    it('handles primitive values', () => {
      expect(toPrimitive('test')).toBe('test');
      expect(toPrimitive(123)).toBe('123');
      expect(toPrimitive(true)).toBe('true');
    });

    it('handles null and undefined', () => {
      expect(toPrimitive(null)).toBe('');
      expect(toPrimitive(undefined)).toBe('');
    });

    it('handles complex objects', () => {
      const obj = { name: 'test', value: 123 };
      expect(toPrimitive(obj)).toBe('{"name":"test","value":"123"}');
    });

    it('handles circular references', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;
      expect(toPrimitive(obj)).toBe('{"name":"test"}');
    });
  });

  describe('hasCircularReferences', () => {
    it('detects circular references', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;
      expect(hasCircularReferences(obj)).toBe(true);
    });

    it('handles non-circular objects', () => {
      const obj = { name: 'test', nested: { value: 123 } };
      expect(hasCircularReferences(obj)).toBe(false);
    });
  });

  describe('removeCircularReferences', () => {
    it('removes circular references', () => {
      const obj: any = { name: 'test' };
      obj.self = obj;
      const result = removeCircularReferences(obj);
      expect(result).toEqual({ name: 'test', self: '[Circular]' });
    });

    it('preserves non-circular structure', () => {
      const obj = { name: 'test', nested: { value: 123 } };
      const result = removeCircularReferences(obj);
      expect(result).toEqual(obj);
    });
  });
});