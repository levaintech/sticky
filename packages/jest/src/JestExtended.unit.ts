import 'jest-extended';

it('should contain jest-extended', () => {
  expect(1).toBeOneOf([1, 2, 3]);
  expect('').toBeEmpty();
});
