'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  // Route for checking if a given value is valid in a specific cell
  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Check for missing fields
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validate the puzzle string length (assuming it's 81 characters)
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      const response = solver.validate(puzzle)
      if (response.error) {
        return res.json({ error: response.error })
      }

      const validCoordinateRegex = /^[A-I][1-9]$/
      const coordinateIsValid = validCoordinateRegex.test(coordinate)
      if (!coordinateIsValid) {
        return res.json({ error: 'Invalid coordinate' })
      }
      // Validate the value (should be a number between 1 and 9)
      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      // Validate the coordinate (e.g., 'A1' - 'I9')
      const row = coordinate[0].toUpperCase();
      const column = parseInt(coordinate[1]);

      if (!/[A-I]/.test(row) || isNaN(column) || column < 1 || column > 9) {
        return res.json({ error: 'Invalid coordinate' });
      }

      // Determine the index of the puzzle based on the coordinate
      const rowIndex = row.charCodeAt(0) - 'A'.charCodeAt(0);
      const columnIndex = column - 1;
      const puzzleIndex = rowIndex * 9 + columnIndex;

      // Check if the value is already placed in the puzzle at the coordinate
      if (puzzle[puzzleIndex] === value) {
        return res.json({ valid: true });
      }

      // Check for conflicts (row, column, region)
      const conflicts = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflicts.push('row');
      }

      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflicts.push('column');
      }

      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflicts.push('region');
      }

      if (conflicts.length > 0) {
        return res.json({ valid: false, conflict: conflicts });
      }

      // If no conflicts, return valid: true
      return res.json({ valid: true });
    });


  // Route for solving the puzzle
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' })
      }
      // Validate the puzzle string
      const validation = solver.validate(puzzle);
      if (validation !== true) {
        return res.json(validation);
      }

      // Attempt to solve the puzzle
      const solution = solver.solve(puzzle);
      if (solution) {
        return res.json({ solution });
      } else {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
    });
};
