## Projects Overview

## Project Name: WorldCup Database

### Description
This project, built for the freeCodeCamp RDS certificate, manages data about the 2014 and 2018 World Cups.

### Features
- **Tables**: The database contains two primary tables:
  - `teams`
  - `games`
  
- **Relationships**:
  - Each `game` is associated with two `teams`.

- **Columns**:
  - `teams`: `team_id`, `name`
  - `games`: `game_id`, `home_team_id`, `away_team_id`, `home_score`, `away_score`, `year`, `round`

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Tabsir99/freeCodeCamp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Worldcup_Database
    ```
3. Create a database named `worldcup` in your preferred relational database management system (e.g., PostgreSQL, MySQL).
4. Import the database schema and data using the provided `worldcup.sql` and `insert_data.sh` files:
    - For PostgreSQL:
      ```bash
      psql -U your_username -d worldcup -f worldcup.sql
      sh insert_data.sh
      ```
    - For MySQL:
      ```bash
      mysql -u your_username -p worldcup < worldcup.sql
      sh insert_data.sh
      ```

### Usage
- Run SQL queries to explore the database schema and relationships.
- Example queries are provided within the `queries.sh` file to help test and validate the database structure.