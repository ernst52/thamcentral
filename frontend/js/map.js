// Map initial setup
const map = L.map('map').setView([18.79, 98.98], 10);// L is leaftlet global obj and 10 is zoom level

// Layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri'
});

const baseLayers = {
    "Street": osm,
    "Topographic": topo,
    "Satellite": satellite
};

L.control.layers(baseLayers).addTo(map);
osm.addTo(map); // default layer

//Markers
