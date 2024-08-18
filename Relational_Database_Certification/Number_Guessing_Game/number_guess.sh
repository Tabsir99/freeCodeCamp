#!/bin/bash

NUMBER_TO_GUESS=$(shuf -i 1-1000 -n 1)
PSQL="psql -U freecodecamp -d number_guess -t --no-align -c"

echo "Enter your username:"
read USERNAME

# Query the database for user information
USER_INFO=$($PSQL "SELECT username, games_played, best_game FROM users WHERE username='$USERNAME';")

if [[ -z $USER_INFO ]]; then
  # New user
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  $PSQL "INSERT INTO users(username, games_played, best_game) VALUES('$USERNAME', 0, 0);" > /dev/null
else
  # Existing user
  IFS='|' read -r DB_USERNAME GAMES_PLAYED BEST_GAME <<< "$USER_INFO"
  echo "Welcome back, $DB_USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Start the game
echo "Guess the secret number between 1 and 1000:"
NUMBER_OF_GUESSES=0

while true; do
  read GUESS
  if ! [[ "$GUESS" =~ ^[0-9]+$ ]]; then
    echo "That is not an integer, guess again:"
    continue
  fi
  NUMBER_OF_GUESSES=$((NUMBER_OF_GUESSES + 1))

  if [[ $GUESS -lt $NUMBER_TO_GUESS ]]; then
    echo "It's higher than that, guess again:"
  elif [[ $GUESS -gt $NUMBER_TO_GUESS ]]; then
    echo "It's lower than that, guess again:"
  else
    break
  fi
done

# Update user's game stats
if [[ -z $USER_INFO ]]; then
  # First game
  $PSQL "UPDATE users SET games_played = 1, best_game = $NUMBER_OF_GUESSES WHERE username = '$USERNAME';"
else
  # Update existing user
  NEW_GAMES_PLAYED=$((GAMES_PLAYED + 1))
  if [[ $NUMBER_OF_GUESSES -lt $BEST_GAME ]] || [[ $BEST_GAME -eq 0 ]]; then
    $PSQL "UPDATE users SET games_played = $NEW_GAMES_PLAYED, best_game = $NUMBER_OF_GUESSES WHERE username = '$USERNAME';" > /dev/null
  else
    $PSQL "UPDATE users SET games_played = $NEW_GAMES_PLAYED WHERE username = '$USERNAME';" > /dev/null
  fi
fi


echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $NUMBER_TO_GUESS. Nice job!"
