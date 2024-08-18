## Project Overview

## Project Name: Periodic Table Database

### Description

The Periodic Table Database is a bash script that interacts with a PostgreSQL database to provide information about chemical elements. It's part of the Relational Database certification from freeCodeCamp, demonstrating skills in bash scripting, PostgreSQL database management, and Git version control.

### Features

- **Element Information**: The script provides detailed information about chemical elements.

- **User Interaction**:
  - Accepts user input for element lookup (atomic number, symbol, or name).
  - Retrieves and displays element data from the database.
  - Handles error cases for non-existent elements.

### Prerequisites

- Bash shell
- PostgreSQL database
- `psql` command-line tool


### Usage

- Run the script with an element as an argument:

    ```bash
    ./element.sh [ELEMENT]
    ```

    Where `[ELEMENT]` can be the atomic number, symbol, or name of an element.

- Examples:

    ```bash
    ./element.sh 1
    ./element.sh H
    ./element.sh Hydrogen
    ```

    If no argument is provided, the script will prompt for input.

### Database Structure

- **elements**: Stores basic element information (`atomic_number`, `symbol`, `name`).
- **properties**: Contains detailed properties of elements (`atomic_mass`, `melting_point_celsius`, `boiling_point_celsius`).
- **types**: Categorizes elements into different types (`metal`, `nonmetal`, `metalloid`).

### Project Structure

- **element.sh**: Main bash script for interacting with the database.
- **periodic_table.sql**: SQL file containing database schema and initial data.
