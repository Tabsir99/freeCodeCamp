## Projects Overview

## Project Name: Celestial Bodies Database

### Description
This project involves creating a comprehensive database named `universe` to catalog various celestial bodies, including galaxies, stars, planets, moons, and exoplanets. The project showcases the design and implementation of a relational database with entities connected through one-to-many relationships.

### Features
- **Tables**: The database contains five primary tables:
  - `galaxy`
  - `star`
  - `planet`
  - `moon`
  - `exoplanet`
  
- **Relationships**: 
  - Each `galaxy` can contain multiple `stars`.
  - Each `star` can have multiple `planets` and `exoplanets`.
  - Each `planet` can have multiple `moons`.
  
  These relationships are implemented using primary and foreign keys, ensuring referential integrity within the database.

- **Columns**:
  - Common columns across tables include `table_name_id`, `name`, `description`, and `size/radius`.
  - Unique columns specific to certain tables include attributes like `has_life`, `luminosity`, `brightness`, and others that provide detailed characteristics of each celestial body.

### Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Manually create a database named `universe` in your preferred relational database management system (e.g., PostgreSQL, MySQL).
4. Import the database schema and data using the provided `universe.sql` file:
    - For PostgreSQL:
      ```bash
      psql -U your_username -d universe -f universe.sql
      ```
    - For MySQL:
      ```bash
      mysql -u your_username -p universe < universe.sql
      ```

### Usage
- Run SQL queries to explore the database schema and relationships.
- Example queries are provided within the `universe.sql` file to help test and validate the database structure.

