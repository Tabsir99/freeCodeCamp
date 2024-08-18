#!/bin/bash

PSQL="psql -U tabsir -d salon -A -t -c"

# More permissive regex for US phone numbers
PHONE_REGEX="^(1[-.\s]?)?(\+?1[-.\s]?)?((\([0-9]{3}\))|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$"

# Get services
SERVICES=$($PSQL "SELECT service_id || ') ' || name FROM services")
readarray -t SERVICES_ID < <($PSQL "SELECT service_id FROM services")

# Main menu
echo -e "Welcome to the salon, How may I help you today?\n\n$SERVICES\n"
while true; do
  read SERVICE_ID
  if [[ -z $SERVICE_ID ]]; then
    echo "Please enter a valid service ID..."
  elif [[ ! " ${SERVICES_ID[*]} " =~ " $SERVICE_ID " ]]; then
    echo -e "I could not find that service. What would you like today?\n\n$SERVICES\n"
  else
    break
  fi
done

# Get phone number
echo -e "\nWhat's your phone number?"
while true; do
  read CUSTOMER_PHONE
  if [[ ! $CUSTOMER_PHONE =~ $PHONE_REGEX ]]; then
    echo -e "\nThe number isn't a valid US phone number. Please try a different number..."
  else
    # Standardize the phone number
    STANDARDIZED_PHONE=$(echo $CUSTOMER_PHONE | sed 's/[^0-9]//g')
    # Remove leading '1' if present
    STANDARDIZED_PHONE=${STANDARDIZED_PHONE#1}
    break
  fi
done

# Check if customer exists
CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$STANDARDIZED_PHONE'")
if [[ -z $CUSTOMER_NAME ]]; then
  echo -e "\nI don't have a record for that phone number, what's your name?"
  read CUSTOMER_NAME
  $PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$STANDARDIZED_PHONE')" > /dev/null
fi

# Get customer ID and service name
CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$STANDARDIZED_PHONE'")
SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID")

# Get appointment time
echo -e "\nWhat time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
read SERVICE_TIME

# Book the appointment
INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID, '$SERVICE_TIME')")

# Confirm booking
if [[ $INSERT_APPOINTMENT_RESULT == "INSERT 0 1" ]]; then
  echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
else
  echo -e "\nSorry, there was an error booking your appointment. Please try again."
fi