## Project Overview

## Project Name: Salon Appointment Scheduler

### Description

The Salon Appointment Scheduler is a bash script that simulates a salon appointment booking system. It's part of the Relational Database certification from freeCodeCamp, showcasing skills in bash scripting and PostgreSQL database interactions.

### Features

- **Display Services**: The script displays a list of available salon services.
- **User Interaction**:
  - Accepts user input for service selection, phone number, and appointment time.
  - Checks if a customer exists in the database.
  - Adds new customers to the database.
  - Schedules appointments and stores them in the database.
  - Provides confirmation messages for booked appointments.

### Prerequisites

- Bash shell
- PostgreSQL database
- `psql` command-line tool

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tabsir99/freeCodeCamp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd freeCodeCamp/Relational_Database_Certification/Salon_Appointment_Scheduler
   ```

3. Make the script executable:

   ```bash
   chmod +x salon.sh
   ```

4. Set up the PostgreSQL or MySQL database:

   - Manually create a database named `salon` in your preferred database management system.
   - Connect to your database:

     - For PostgreSQL:
       ```bash
       psql -U your_username -d salon
       ```
     - For MySQL:

       ```bash
       mysql -u your_username -p salon
       ```

   - Execute the provided `setup.sql` file to create the necessary tables and populate the `services` table:

     - For PostgreSQL:

       ```bash
       psql -U your_username -d salon -f setup.sql
       ```

     - For MySQL:

       ```bash
       mysql -u your_username -p salon < setup.sql
       ```

   - The `setup.sql` file contains all the SQL commands needed to set up your `customers`, `services`, and `appointments` tables along with initial data.

### Usage

- Run the script:

  ```bash
  ./salon.sh
  ```

- Follow the prompts to book an appointment:
  - Select a service from the displayed list.
  - Enter your phone number.
  - If you're a new customer, enter your name.
  - Specify the desired appointment time.
  - The script will confirm your appointment with a message.

### Database Structure

- **customers**: Stores customer information (`id`, `name`, `phone`).
- **services**: Contains available salon services (`id`, `name`).
- **appointments**: Records booked appointments (`id`, `customer_id`, `service_id`, `time`).
