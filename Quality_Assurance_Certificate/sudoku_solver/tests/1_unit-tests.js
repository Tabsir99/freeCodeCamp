const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
  
    test('Logic handles a valid puzzle string of 81 characters', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validation = solver.validate(puzzle);
      assert.equal(validation, true, 'Expected the puzzle to be valid');
    });
  
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
      const puzzle = 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validation = solver.validate(puzzle);
      assert.isObject(validation, 'Expected an object with an error');
      assert.property(validation, 'error', 'Expected an error property');
      assert.equal(validation.error, 'Invalid characters in puzzle', 'Expected error message for invalid characters');
    });
  
    test('Logic handles a puzzle string that is not 81 characters in length', () => {
      const puzzle = '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validation = solver.validate(puzzle);
      assert.isObject(validation, 'Expected an object with an error');
      assert.property(validation, 'error', 'Expected an error property');
      assert.equal(validation.error, 'Expected puzzle to be 81 characters long', 'Expected error message for incorrect length');
    });
  
    test('Logic handles a valid row placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validRow = solver.checkRowPlacement(puzzle, 'A', 1, '7');
      assert.isTrue(validRow, 'Expected row placement to be valid');
    });
  
    test('Logic handles an invalid row placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const invalidRow = solver.checkRowPlacement(puzzle, 'A', 1, '5');
      assert.isFalse(invalidRow, 'Expected row placement to be invalid');
    });
  
    test('Logic handles a valid column placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validCol = solver.checkColPlacement(puzzle, 'A', 1, '7');
      assert.isTrue(validCol, 'Expected column placement to be valid');
    });
  
    test('Logic handles an invalid column placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const invalidCol = solver.checkColPlacement(puzzle, 'A', 1, '1');
      assert.isFalse(invalidCol, 'Expected column placement to be invalid');
    });
  
    test('Logic handles a valid region (3x3 grid) placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const validRegion = solver.checkRegionPlacement(puzzle, 'A', 1, '7');
      assert.isTrue(validRegion, 'Expected region placement to be valid');
    });
  
    test('Logic handles an invalid region (3x3 grid) placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const invalidRegion = solver.checkRegionPlacement(puzzle, 'A', 1, '5');
      assert.isFalse(invalidRegion, 'Expected region placement to be invalid');
    });
  
    test('Valid puzzle strings pass the solver', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = solver.solve(puzzle);
      assert.isString(solution, 'Expected a solution string');
      assert.equal(solution.length, 81, 'Expected solution to be 81 characters long');
    });
  
    test('Invalid puzzle strings fail the solver', () => {
      const puzzle = 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = solver.validate(puzzle);      
      assert.isObject(solution, 'Expected an object with an error');
      assert.property(solution, 'error', 'Expected an error property');
      assert.equal(solution.error, 'Invalid characters in puzzle', 'Expected error message for invalid puzzle');
    });
  
    test('Solver returns the expected solution for an incomplete puzzle', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const expectedSolution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      const solution = solver.solve(puzzle);
      assert.equal(solution, expectedSolution, 'Expected the correct solution for the puzzle');
    });
  
  });
  
