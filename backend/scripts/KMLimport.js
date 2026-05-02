import { XMLParser }  from "fast-xml-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

parseXML();

async function parseXML() {
  try {
    const xmlPath = path.join(__dirname, "../../1docs/raw_data/rawLite.xml");
    // const xmlPath = path.join(__dirname, "../../1docs/raw_data/rawdata_april2026.kml");
    const xmlData = await fs.readFile(xmlPath);
    const parser = new XMLParser();
    let jObj = parser.parse(xmlData);

    // const placemarks = JSON.stringify(jObj.kml.Document.Folder.Placemark, null, 2); // null means don’t transform/filter anything and 2 means adds indentation 2 spaces so it’s readable
    // ^ that's just for testing, it became string not array, so it won't work.
    const placemarks = jObj.kml.Document.Folder.Placemark;

    const parsedPlacemarks = placemarks.map(pm => {
        return parsePlacemark(pm); // DON'T FORGET RETURN!!! RAHHHH
    })

    console.log(parsedPlacemarks);
  } catch (err) {
    console.error(err);
  }
}

function parsePlacemark(pm) { // visit https://regexr.com/ for regex info
    const name = pm.name;
    const description = pm.description;
    const coord = pm.Point.coordinates;

    // ---- //
    // NAME //
    // ---- //
    const nparts = name.split('  ');
    const stat = nparts[1].match(/\[(.)\]/g);
    const explostat = stat[0].match(/\/|X|O|\?/g);
    let cavestatname;
    switch (explostat[0]) {
        case "X":
            cavestatname = "FINISHED"
            break;
        case "/":
            cavestatname = "IN_EXPLORATION"
            break;
        case "O":
            cavestatname = "FOUND_NOT_EXPLORED"
            break;
        case "?":
            cavestatname = "UNKNOWN"
            break;
    }

    const cavecode = nparts[0].trim();
    const cavename = nparts[1].replace(/\[(.)\]/g, "").trim();
    
    // -------------- //
    // DESC AND COORD //
    // -------------- //

    // LOCALITY AND PROVINCE
    const locality = description.match(/LOCALITY:\s*<\/B>TH\s*(.+?)\s*\[/i); // you need "?" or else it'll grab empty space tho
    const province = description.match(/LOCALITY:\s*<\/B>TH\s*(.+)\s*\[(.+?)\]/i);

    const cavelocality = locality[1].trim();
    const caveprovince = province[2].trim();

    //SYNONYM
    let cSynonym;
    const synonym = description.match(/SYNONYM:\s*<\/B>(.+?)\s*<BR/i);
    if (!synonym) {
        cSynonym = null;
    } else {
        cSynonym = synonym[1].trim().split(",").map(s => s.trim()); //.map just clears the empty space inside each synonym entry;
    }

    const cavesynonym = cSynonym;

    // COORD
    const coordRegex = coord.match(/,.+(,.*)/)
    const coord_parts = coord.replace(coordRegex[1], "").split(",")

    const cavelatitude = parseFloat(coord_parts[1]);
    const cavelongtitude = parseFloat(coord_parts[0]);

    // DEPTH AND LENGTH
    const depth = description.match(/DEPTH:\s*<\/B>(.+?)m/i); // Don't fucking add g when capture. It'll wreck it. Basically turning the whole ass match instead of arrays
    const length = description.match(/LENGTH:\s*<\/B>(.+?)m/i);

    const cavedepth = parseFloat(depth[1].trim());
    const cavelength = parseFloat(length[1].trim());

    // PERSPECT
    let caveperspect;
    const perspect = description.match(/PERSPECT:\s*<\/B>(.+?)\s*<BR>/i);
    if (!perspect) {
        caveperspect = null;
    } else {
        caveperspect = perspect[1].trim();
    }

    // AIRFLOW
    let caveairflow;
    const airflow = description.match(/AIRFLOW:\s*<\/B>(.+?)\s*<BR>/i);
    if (!airflow) {
        caveairflow = null;
    } else {
        caveairflow = airflow[1].trim();
    }

    // HISTROY
    let cavehistory;
    const history = description.match(/HISTORY:\s*<\/B>(.+?)\s*<BR>/i);
    if (!history) {
        cavehistory = null;
    } else {
        cavehistory = history[1].trim();
    };

    // POSITION
    let cavePosition;
    const position = description.match(/POSITION:\s*<\/B>(.+?)\s*<BR>/i);
    if (!position) {
        cavePosition = null;
    } else {
        cavePosition = position[1].trim();
    };

    // DESCRIPTION
    let caveDescription;
    const cDesc = description.match(/DESCRIPTION:\s*<\/B>(.+?)\s*<BR>/i);
    if (!cDesc) {
        caveDescription = null;
    } else {
        caveDescription = cDesc[1].trim();
    };

    // ACCESS
    let caveaccess;
    const accessibility = description.match(/ACCESS:\s*<\/B>(.+?)\s*<BR>/i);
    if (!accessibility) {
        caveaccess = null;
    } else {
        caveaccess = accessibility[1].trim();
    };

    // GEO_HYDRO
    let caveGeoHydro;
    const geohydro = description.match(/GEO_HYDRO:\s*<\/B>(.+?)\s*<BR>/i);
    if (!geohydro) {
        caveGeoHydro = null;
    } else {
        caveGeoHydro = geohydro[1].trim();
    };

    return {
      cave_code: cavecode,
      cave_name: cavename,
      cave_exploration_status: cavestatname,
      cave_locality: cavelocality,
      cave_province: caveprovince,
      cave_synonym: cavesynonym,
      cave_latitude: cavelatitude,
      cave_longitude: cavelongtitude,
      cave_depth: cavedepth,
      cave_length: cavelength,
      cave_perspect: caveperspect,
      cave_airflow: caveairflow,
      cave_history: cavehistory,
      cave_position: cavePosition,
      cave_description: caveDescription,
      cave_accessibility: caveaccess,
      cave_geo_hydro: caveGeoHydro,
    };
}

/*
    cave_code - clear
    cave_name - clear
    cave_exploration_status - clear
    cave_locality - clear
    cave_province - clear
    cave_synonym * might null - clear
    cave_latitude - clear
    cave_longitude - clear
    cave_depth - clear
    cave_length - clear
    cave_perspect - clear
    cave_airflow * might null - clear
    cave_history * might null - clear
    cave_position - clear
    cave_description - clear
    cave_accessibility * might null - clear
    cave_geo_hydro * might null - clear
    
    ** missing cave_map and cave_tags **
*/

