#!/bin/bash

  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"

# Do not change code above this line. Use the PSQL variable above to query your database.

# Truncate the tables before inserting data
echo $($PSQL "TRUNCATE TABLE games, teams;")

# Read through the CSV file
cat games.csv | while IFS=',' read -r year round winner opponent winner_goals opponent_goals || [[ -n "$year" ]]
do
  if [[ $year != 'year' ]]; then
    # Get the winner ID
    winner_id=$($PSQL "SELECT team_id FROM teams WHERE name='$winner'")
    
    # If the winner doesn't exist, insert it
    if [[ -z $winner_id ]]; then
      INSERT_WINNER=$($PSQL "INSERT INTO teams (name) VALUES ('$winner')")
      if [[ $INSERT_WINNER == "INSERT 0 1" ]]; then
        echo "Inserted into teams, $winner"
      fi
      winner_id=$($PSQL "SELECT team_id FROM teams WHERE name='$winner'")
    fi

    # Get the opponent ID
    opponent_id=$($PSQL "SELECT team_id FROM teams WHERE name='$opponent'")
    
    # If the opponent doesn't exist, insert it
    if [[ -z $opponent_id ]]; then
      INSERT_OPPONENT=$($PSQL "INSERT INTO teams (name) VALUES ('$opponent')")
      if [[ $INSERT_OPPONENT == "INSERT 0 1" ]]; then
        echo "Inserted into teams, $opponent"
      fi
      opponent_id=$($PSQL "SELECT team_id FROM teams WHERE name='$opponent'")
    fi

    # Insert the game
    INSERT_GAME=$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($year, '$round', $winner_id, $opponent_id, $winner_goals, $opponent_goals)")
    if [[ $INSERT_GAME == "INSERT 0 1" ]]; then
      echo "Inserted into games, $year $round"
    fi
  fi
done
