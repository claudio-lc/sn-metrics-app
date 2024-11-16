CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE snow_quality_type AS ENUM ('powder', 'crust', 'slush', 'ice');


CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    snow_quality snow_quality_type NOT NULL,
    occupation INT NOT NULL CHECK (occupation <= 100),
    wind_speed INT NOT NULL CHECK (wind_speed >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX metrics_snow_quality_idx ON metrics (snow_quality);
CREATE INDEX metrics_occupation_idx ON metrics (occupation);
CREATE INDEX metrics_wind_speed_idx ON metrics (wind_speed);

INSERT INTO metrics (snow_quality, occupation, wind_speed) VALUES
('powder', 50, 10),
('crust', 70, 20),
('slush', 30, 5),
('ice', 90, 30);

