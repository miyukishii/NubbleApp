import { sub, formatISO, Duration, add } from 'date-fns';

import { dateUtils } from "../dateUtils";

const MOCKED_NOW = 1696573824333

function getDateISO(duration: Duration, op: 'sub' | 'add' = 'sub'): string {
  const time = op === 'sub' ? sub(Date.now(), duration) : add(Date.now(), duration)
  return formatISO(time);
}

describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW)
    })
    afterAll(() => {
      jest.clearAllMocks()
    })
    test('should be displayed in second if less than 1 minute ago', () => {
      const timeISO1 = getDateISO({ seconds: 30 })
      const timeISO2 = getDateISO({ seconds: 1 })
      const test1 = dateUtils.formatRelative(timeISO1);
      const test2 = dateUtils.formatRelative(timeISO2);

      expect(test1).toBe('30 s');
      expect(test2).toBe('1 s');
    });;
    test('should be displayed in minutes if less than 1 hour ago', () => {
      const timeISO1 = getDateISO({ minutes: 20 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('20 min');
    })
    test('should be displayed in hours if less than 1 day ago', () => {
      const timeISO1 = getDateISO({ hours: 22 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('22 h');
    })
    test('should be displayed in days if less than 1 week ago', () => {
      const timeISO1 = getDateISO({ days: 3 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('3 d');
    })
    test('should be displayed in weeks if less than 1 month ago', () => {
      const timeISO1 = getDateISO({ weeks: 3, hours: 2 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('3 sem');
    })
    test('should be displayed in months if less than 1 year ago', () => {
      const timeISO1 = getDateISO({ months: 3 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('3 m');
    })
    test('should be displayed in years if more than 1 year ago', () => {
      const timeISO1 = getDateISO({ months: 13 })
      const test1 = dateUtils.formatRelative(timeISO1);

      expect(test1).toBe('1 a');
    })
  })
})
