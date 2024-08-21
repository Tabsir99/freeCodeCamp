'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  // Route for checking if a given value is valid in a specific cell
  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      // Validate the puzzle string
      const validation = solver.validate(puzzle);
      if (validation !== true) {
        return res.json(validation);
      }

      // Extract row and column from the coordinate
      const row = coordinate[0].toUpperCase();
      const column = parseInt(coordinate[1]);

      // Validate row, column, and region placements
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        return res.json({ valid: false, conflict: 'row' });
      }

      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        return res.json({ valid: false, conflict: 'column' });
      }

      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        return res.json({ valid: false, conflict: 'region' });
      }

      // If all checks pass
      return res.json({ valid: true });
    });
    
  // Route for solving the puzzle
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

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
