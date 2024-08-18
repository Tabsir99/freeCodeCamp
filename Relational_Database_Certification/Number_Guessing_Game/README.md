## Project Overview

## Project Name: Number Guessing Game

### Description

The Number Guessing Game is a bash script that challenges users to guess a randomly generated number. It's part of the Relational Database certification from freeCodeCamp, demonstrating skills in bash scripting, PostgreSQL database management, and Git version control.

### Features

- **Random Number Generation**: The script generates a random number for users to guess.
  
- **User Interaction**:
  - Prompts for and accepts username input.
  - Provides personalized welcome messages for new and returning users.
  - Guides users through the guessing process with appropriate hints.
  - Handles invalid inputs gracefully.
  - Displays game statistics upon completion.

### Prerequisites

- Bash shell
- PostgreSQL database
- `psql` command-line tool

### Installation

1. Clone the repository:

    ```bash
    git clone <your-repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd project/number_guessing_game
    ```

3. Make the script executable:

    ```bash
    chmod +x number_guess.sh
    ```

4. Ensure the PostgreSQL database is set up with the required table:

    - Manually create a database named `number_guess` in your PostgreSQL server.

    - Connect to your database:

        ```bash
        psql -U freecodecamp -d number_guess
        ```

    - Create the `users` table:

        ```sql
        CREATE TABLE users (
          username VARCHAR(50) UNIQUE NOT NULL,
          games_played INT NOT NULL DEFAULT 0,
          best_game INT
        );
        ```

### Usage

- Run the script:

    ```bash
    ./number_guess.sh
    ```

- Follow the prompts to play the game:

  - Enter your username when prompted.
  - Guess the secret number between 1 and 1000.
  - Receive hints after each incorrect guess.
  - Continue guessing until you find the correct number.

### Database Structure

- **users**: Stores user information and game statistics (`username`, `games_played`, `best_game`).


### Project Structure

- **number_guess.sh**: Main bash script for the game.
