CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE snow_quality_type AS ENUM ('powder', 'crust', 'slush', 'ice');


CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snow_quality snow_quality_type NOT NULL,
    occupation INT NOT NULL CHECK (occupation <= 100),
    wind_speed INT NOT NULL CHECK (wind_speed >= 0 AND wind_speed <= 200),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP CHECK (date <= CURRENT_TIMESTAMP)
);


INSERT INTO metrics (snow_quality, occupation, wind_speed, date) VALUES
('powder', 30, 10, '2023-11-15 12:00:00'),
('powder', 28, 14, '2023-11-22 12:00:00'),
('powder', 26, 18, '2023-11-29 12:00:00'),
('powder', 24, 22, '2023-12-06 12:00:00'),
('powder', 22, 26, '2023-12-13 12:00:00'),
('powder', 20, 30, '2023-12-20 12:00:00'),
('powder', 18, 34, '2023-12-27 12:00:00'),
('powder', 16, 38, '2024-01-03 12:00:00'),
('powder', 14, 42, '2024-01-10 12:00:00'),
('powder', 12, 46, '2024-01-17 12:00:00'),
('powder', 10, 50, '2024-01-24 12:00:00'),
('powder', 1, 70, '2024-02-28 12:00:00'),
('powder', 1, 74, '2024-03-06 12:00:00'),
('powder', 1, 78, '2024-03-13 12:00:00'),
('powder', 1, 82, '2024-03-20 12:00:00'),
('powder', 1, 86, '2024-03-27 12:00:00'),
('powder', 1, 90, '2024-04-03 12:00:00'),
('powder', 1, 94, '2024-04-10 12:00:00'),
('powder', 1, 98, '2024-04-17 12:00:00'),
('powder', 1, 102, '2024-04-24 12:00:00'),
('crust', 35, 14, '2023-11-15 12:00:00'),
('crust', 30, 18, '2023-11-29 12:00:00'),
('crust', 25, 22, '2023-12-13 12:00:00'),
('powder', 20, 26, '2024-01-03 12:00:00'),
('powder', 15, 30, '2024-01-17 12:00:00'),
('powder', 10, 34, '2024-01-31 12:00:00'),
('powder', 5, 38, '2024-02-14 12:00:00'),
('powder', 1, 42, '2024-02-28 12:00:00'),
('powder', 1, 46, '2024-03-13 12:00:00'),
('powder', 1, 50, '2024-03-27 12:00:00'),
('slush', 1, 54, '2024-04-03 12:00:00'),
('slush', 1, 58, '2024-04-17 12:00:00');
