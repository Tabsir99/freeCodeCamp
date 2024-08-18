
-- DROP TABLE appointments;
-- DROP TABLE customers;
-- DROP TABLE services;

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE
);

-- Create the services table
CREATE TABLE IF NOT EXISTS services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL
);

-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id SERIAL PRIMARY KEY,
    customer_id INT,
    service_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (service_id) REFERENCES services (service_id),
    time VARCHAR(150) NOT NULL
);

-- Insert sample data into the services table
INSERT INTO services (service_id, name) VALUES
(1, 'cut'),
(2, 'color'),
(3, 'perm'),
(4, 'style'),
(5, 'trim');
