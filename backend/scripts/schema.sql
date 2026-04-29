CREATE TABLE caves(
    cave_id SERIAL PRIMARY KEY,
    cave_code VARCHAR(10) UNIQUE, -- MC0001
    cave_name VARCHAR(50), -- Dungeon cave
    cave_tags TEXT[], -- SRT,Intermediate,Water
    cave_exploration_status VARCHAR(25) CHECK (cave_exploration_status IN ('FINISHED','IN_EXPLORATION','FOUND_NOT_EXPLORED','UNKNOWN')), -- X = Finished | / = In exploration | O = found, but not explored | ? = not known, will turn all of these symbol into text
    cave_locality VARCHAR(50), -- Taiga Village
    cave_province VARCHAR(50), -- Lorenzstadt
    cave_synonym TEXT[], -- Creeper's cave or null
    cave_latitude DECIMAL(10,8), -- 12.12345678 will be taken from <coordinates>XX.XXXXXXXX,XX.XXXXXXXX,0</coordinates> in <placemark>
    cave_longitude DECIMAL(10,8), -- 12.12345678 will be taken from <coordinates>XX.XXXXXXXX,XX.XXXXXXXX,0</coordinates> in <placemark>
    cave_depth DECIMAL(6,2), -- 100.0m
    cave_length DECIMAL(7,2), -- 1000.00m
    cave_perspect VARCHAR(10) CHECK (cave_perspect IN ('UNKNOWN','NONE','LIMITED','BIG','GOOD')), -- UNKNOWN, NONE, LIMITED, BIG, GOOD
    cave_airflow VARCHAR(255), -- Smells like chicken or null
    cave_history TEXT, -- Steve got killed by creeper or null
    cave_position TEXT, -- How to get there
    cave_description TEXT, -- description
    cave_map VARCHAR(255), -- Image url or null
    cave_accessibility VARCHAR(255), -- 64 emeralds or null
    cave_geo_hydro TEXT, -- permian limestone or null
    cave_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- Add DEFAULT NOW() so it auto-populates.
)
-- Postgres doesn’t auto-update DEFAULT NOW() by default. You need a trigger. Yeah idk how it work just copied template from somewhere lol
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cave_updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cave_updated_at
BEFORE UPDATE ON caves
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();


--Haversine for later

