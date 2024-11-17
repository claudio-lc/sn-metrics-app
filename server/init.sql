CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE snow_quality_type AS ENUM ('powder', 'crust', 'slush', 'ice');


CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snow_quality snow_quality_type NOT NULL,
    occupation INT NOT NULL CHECK (occupation <= 100),
    wind_speed INT NOT NULL CHECK (wind_speed >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO metrics (snow_quality, occupation, wind_speed, created_at) VALUES
('powder', 60, 15, '2024-01-08 12:00:00'),
('crust', 80, 25, '2024-01-09 12:00:00'),
('slush', 40, 10, '2024-01-10 12:00:00'),
('ice', 95, 35, '2024-01-11 12:00:00'),
('powder', 55, 12, '2024-01-12 12:00:00'),
('crust', 75, 22, '2024-01-13 12:00:00'),
('slush', 35, 8, '2024-01-14 12:00:00'),
('ice', 85, 28, '2024-01-15 12:00:00'),
('powder', 65, 18, '2024-01-16 12:00:00'),
('crust', 78, 27, '2024-01-17 12:00:00'),
('slush', 42, 11, '2024-01-18 12:00:00'),
('ice', 92, 32, '2024-01-19 12:00:00'),
('powder', 70, 20, '2024-02-01 12:00:00'),
('crust', 82, 26, '2024-02-02 12:00:00'),
('slush', 45, 12, '2024-02-03 12:00:00'),
('ice', 90, 30, '2024-02-04 12:00:00'),
('powder', 60, 15, '2024-02-05 12:00:00'),
('crust', 77, 23, '2024-02-06 12:00:00'),
('slush', 38, 9, '2024-02-07 12:00:00'),
('ice', 88, 29, '2024-02-08 12:00:00'),
('powder', 68, 19, '2024-02-09 12:00:00'),
('crust', 80, 25, '2024-02-10 12:00:00'),
('slush', 43, 11, '2024-02-11 12:00:00'),
('ice', 93, 33, '2024-02-12 12:00:00'),
('powder', 72, 21, '2024-03-01 12:00:00'),
('crust', 85, 28, '2024-03-02 12:00:00'),
('slush', 50, 14, '2024-03-03 12:00:00'),
('ice', 96, 36, '2024-03-04 12:00:00'),
('powder', 66, 17, '2024-03-05 12:00:00'),
('crust', 79, 24, '2024-03-06 12:00:00'),
('slush', 41, 10, '2024-03-07 12:00:00'),
('ice', 91, 31, '2024-03-08 12:00:00'),
('powder', 69, 18, '2024-03-09 12:00:00'),
('crust', 83, 27, '2024-03-10 12:00:00'),
-- ('slush', 47, 13, '2024-03-11 12:00:00'),
('ice', 94, 34, '2024-03-12 12:00:00');

