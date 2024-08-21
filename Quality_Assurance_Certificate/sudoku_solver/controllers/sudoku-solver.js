// /controllers/sudoku-solver.js

class SudokuSolver {
  // Validate the puzzle string: must be 81 characters and contain only valid characters (1-9, .)
  validate(puzzleString) {
    const validChars = /^[1-9.]+$/;
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }
    if (!validChars.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    }
    return true;
  }

  // Check if placing value at row and column is valid
  checkRowPlacement(puzzleString, row, column, value) {
    const rowIndex = "ABCDEFGHI".indexOf(row);
    const rowStart = rowIndex * 9;
    const rowValues = puzzleString.slice(rowStart, rowStart + 9);
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndex = column - 1;
    for (let i = colIndex; i < 81; i += 9) {
      if (puzzleString[i] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = "ABCDEFGHI".indexOf(row);
    const colIndex = column - 1;

    const regionRowStart = Math.floor(rowIndex / 3) * 3;
    const regionColStart = Math.floor(colIndex / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const idx = (regionRowStart + r) * 9 + (regionColStart + c);
        if (puzzleString[idx] === value) {
          return false;
        }
      }
    }
    return true;
  }

  // Solve the puzzle using backtracking
  solve(puzzleString) {
    const solveRecursive = (board) => {
      const emptyIndex = board.indexOf('.');
      if (emptyIndex === -1) {
        return board; // Solved
      }
      const row = Math.floor(emptyIndex / 9);
      const col = emptyIndex % 9;
      const rowLetter = "ABCDEFGHI".charAt(row);

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (this.checkRowPlacement(board, rowLetter, col + 1, value) &&
          this.checkColPlacement(board, rowLetter, col + 1, value) &&
          this.checkRegionPlacement(board, rowLetter, col + 1, value)) {
          const newBoard = board.substring(0, emptyIndex) + value + board.substring(emptyIndex + 1);
          const solvedBoard = solveRecursive(newBoard);
          if (solvedBoard) {
            return solvedBoard;
          }
        }
      }
      return false; // Trigger backtracking
    };

    return solveRecursive(puzzleString);
  }
}

module.exports = SudokuSolver;
