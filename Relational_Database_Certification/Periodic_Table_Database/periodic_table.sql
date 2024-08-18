-- Rename columns in properties table
ALTER TABLE properties
RENAME COLUMN weight TO atomic_mass;

ALTER TABLE properties
RENAME COLUMN melting_point TO melting_point_celsius;

ALTER TABLE properties
RENAME COLUMN boiling_point TO boiling_point_celsius;

-- Set columns as NOT NULL
UPDATE properties
SET melting_point_celsius = 0 
WHERE melting_point_celsius IS NULL;

UPDATE properties
SET boiling_point_celsius = 0 
WHERE boiling_point_celsius IS NULL;

ALTER TABLE properties
ALTER COLUMN melting_point_celsius SET NOT NULL,
ALTER COLUMN boiling_point_celsius SET NOT NULL;

-- Alter elements table to add constraints and NOT NULLs
ALTER TABLE elements
ALTER COLUMN symbol SET NOT NULL,
ALTER COLUMN name SET NOT NULL;

ALTER TABLE elements
ADD CONSTRAINT unique_symbol UNIQUE (symbol),
ADD CONSTRAINT unique_name UNIQUE (name);

-- Add a foreign key from properties to elements
ALTER TABLE properties
ADD FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number);

-- Create the types table
CREATE TABLE types (
  type_id SERIAL PRIMARY KEY,
  type VARCHAR(30) NOT NULL
);

-- Insert the three types into the types table
INSERT INTO types (type) VALUES ('metal'), ('nonmetal'), ('metalloid');

-- Add type_id column to properties table
ALTER TABLE properties
ADD COLUMN type_id INT;

-- Update type_id values in properties table based on type name
UPDATE properties
SET type_id = (SELECT type_id FROM types WHERE types.type = properties.type);

-- Set type_id as NOT NULL
ALTER TABLE properties
ALTER COLUMN type_id SET NOT NULL;

-- Add foreign key constraint for type_id
ALTER TABLE properties
ADD FOREIGN KEY (type_id) REFERENCES types (type_id);

-- Capitalize the first letter of symbol values
UPDATE elements
SET symbol = INITCAP(symbol);

-- Correct handling of atomic_mass as DECIMAL
ALTER TABLE properties
ALTER COLUMN atomic_mass TYPE DECIMAL USING atomic_mass::DECIMAL;

UPDATE properties
SET atomic_mass = TRIM(TRAILING '0' FROM atomic_mass::TEXT)::DECIMAL;

-- Add Fluorine and Neon elements
INSERT INTO elements (atomic_number, symbol, name)
VALUES (9, 'F', 'Fluorine'), (10, 'Ne', 'Neon');

-- Insert corresponding properties for Fluorine and Neon
INSERT INTO properties (atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id)
VALUES 
(9, 'nonmetal', 18.998, -220, -188.1, (SELECT type_id FROM types WHERE type = 'nonmetal')),
(10, 'nonmetal', 20.18, -248.6, -246.1, (SELECT type_id FROM types WHERE type = 'nonmetal'));