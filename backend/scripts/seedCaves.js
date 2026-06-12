import dotenv from 'dotenv'; // For .env
import { parseXML } from './kmlImport.js';

dotenv.config(); // You need this or else you can't litearlly connect to the DB, well its not like in model since it wasn't connected to index.js which has it.
import pool from '../src/config/db.js'; // You NEED to connect to pool, just like in models so you can queries directly to the db

seeds();

async function seeds() {
    const caves = await parseXML();
    console.log(caves);
    for (const cave of caves) {
        try {
            const result = await pool.query(
            `INSERT INTO caves (
            cave_code, 
            cave_name, 
            cave_exploration_status, 
            cave_locality, 
            cave_province, 
            cave_synonym, 
            cave_latitude, 
            cave_longitude, 
            cave_depth, 
            cave_length,
            cave_perspect,
            cave_airflow,
            cave_history,
            cave_position,
            cave_description,
            cave_accessibility,
            cave_geo_hydro
            )
            VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
            )
            ON CONFLICT (cave_code) DO UPDATE SET
            cave_name = EXCLUDED.cave_name,
            cave_exploration_status = EXCLUDED.cave_exploration_status,
            cave_locality = EXCLUDED.cave_locality,
            cave_province = EXCLUDED.cave_province,
            cave_synonym = EXCLUDED.cave_synonym,
            cave_latitude = EXCLUDED.cave_latitude,
            cave_longitude = EXCLUDED.cave_longitude,
            cave_depth = EXCLUDED.cave_depth,
            cave_length = EXCLUDED.cave_length,
            cave_perspect = EXCLUDED.cave_perspect,
            cave_airflow = EXCLUDED.cave_airflow,
            cave_history = EXCLUDED.cave_history,
            cave_position = EXCLUDED.cave_position,
            cave_description = EXCLUDED.cave_description,
            cave_accessibility = EXCLUDED.cave_accessibility,
            cave_geo_hydro = EXCLUDED.cave_geo_hydro`,
            [
                cave.cave_code,
                cave.cave_name,
                cave.cave_exploration_status,
                cave.cave_locality,
                cave.cave_province,
                cave.cave_synonym,
                cave.cave_latitude,
                cave.cave_longitude,
                cave.cave_depth,
                cave.cave_length,
                cave.cave_perspect,
                cave.cave_airflow,
                cave.cave_history,
                cave.cave_position,
                cave.cave_description,
                cave.cave_accessibility,
                cave.cave_geo_hydro
           ]
        )
        console.log(`Inserted: ${cave.cave_code}`);
        } catch (err) {
            console.error(`Failed: ${cave.cave_code}`, err.message);
        }
        
    } 
};

// For cleaning DB btw: TRUNCATE TABLE caves RESTART IDENTITY;
/*
      cave_code: cavecode,
      cave_name: cavename,
      cave_exploration_status: cavestatname,
      cave_locality: cavelocality,
      cave_province: caveprovince,
      cave_synonym: cavesynonym,
      cave_latitude: cavelatitude,
      cave_longitude: cavelongitude,
      cave_depth: cavedepth,
      cave_length: cavelength,
      cave_perspect: caveperspect,
      cave_airflow: caveairflow,
      cave_history: cavehistory,
      cave_position: cavePosition,
      cave_description: caveDescription,
      cave_accessibility: caveaccess,
      cave_geo_hydro: caveGeoHydro,
*/