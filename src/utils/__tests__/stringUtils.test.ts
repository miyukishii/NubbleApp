import { stringUtils } from "../stringUtils"

describe('stringUtils', () => {
  describe('formatRelative', () => {
    test('should capitalize the first letter of each word', () => {
      const test1 = stringUtils.capitalizeFirstLetter('Ana maria');
      const test2 = stringUtils.capitalizeFirstLetter('ANA MARIA');
      const test3 = stringUtils.capitalizeFirstLetter('ANa MarIa');

      const expectedResult = 'Ana Maria';

      expect(test1).toBe(expectedResult);
      expect(test2).toBe(expectedResult);
      expect(test3).toBe(expectedResult);
    })
    test('shouldremove leading/trailing spaces', () => {
      const test1 = stringUtils.capitalizeFirstLetter(' Ana maria');

      const expectedResult = 'Ana Maria';

      expect(test1).toBe(expectedResult);
    })
  })
})
