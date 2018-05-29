import { ajaxFailure } from '../../src/utils/ajaxUtils';
import { format2Money } from '../../src/utils/formatUtils';

describe('Utils test', () => {
  test('SHOULD ajax failure return a object', () => {
    const type = 'REDUX_TYPE_TEST';
    expect(ajaxFailure(type)).toHaveProperty('meta');
    expect(ajaxFailure(type)).toHaveProperty('type');
    expect(ajaxFailure(type)).toHaveProperty('payload');
  });

  test('SHOULD format numbet to currency', () => {
    expect(format2Money(1234)).toEqual('1,234.00');
    expect(format2Money(21234)).toEqual('21,234.00');
    expect(format2Money(14)).toEqual('14.00');
  });
});
