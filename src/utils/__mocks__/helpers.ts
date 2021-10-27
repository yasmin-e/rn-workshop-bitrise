jest.mock('../helpers.ts', () => {
  const og = jest.requireActual('../helpers.ts');

  return {
    __esModule: true,
    ...og,
    shuffle: jest.fn((arr) => arr),
  };
});
