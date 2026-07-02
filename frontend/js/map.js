// Map initial setup
const map = L.map("map").setView([18.79, 98.98], 10); // L is leaftlet global obj and 10 is zoom level

// Layers
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
});

const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap",
});

const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "© Esri",
  },
);

const baseLayers = {
  Street: osm,
  Topographic: topo,
  Satellite: satellite,
};

L.control.layers(baseLayers).addTo(map);
osm.addTo(map); // default layer

// FILTER BUTTONS
// Menus
const lengthMenu = document.getElementById('length-menu');
const depthMenu = document.getElementById('depth-menu');
const provinceMenu = document.getElementById('province-menu');
// Btns
const lengthBtn = document.getElementById('length-btn');
const depthBtn = document.getElementById('depth-btn');

//Length button
lengthBtn.addEventListener('click', () => {
    const isOpen = !lengthMenu.classList.contains('hidden');
    closeAllMenus();
    if (!isOpen) lengthMenu.classList.remove('hidden'); // If it's already open so skip this but if not make it open
});
//Depth button
depthBtn.addEventListener('click', () => {
    const isOpen = !depthMenu.classList.contains('hidden');
    closeAllMenus();
    if (!isOpen) depthMenu.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-group')) {
        closeAllMenus();
    }
});

function closeAllMenus() {
    lengthMenu.classList.add('hidden');
    depthMenu.classList.add('hidden');
    provinceMenu.classList.add('hidden');
}

// ---- FILTER STUFF ----

// Length and Depth
const Lmin = document.getElementById('length-min');
const Lmax = document.getElementById('length-max');
const Dmin = document.getElementById('depth-min');
const Dmax = document.getElementById('depth-max');

let activeLMin = '';
let activeLMax = '';
let activeDMin = '';
let activeDMax = '';

Lmin.addEventListener('input', () => {
    activeLMin = Lmin.value;
    loadCaves();
});

Lmax.addEventListener('input', () => {
    activeLMax = Lmax.value;
    loadCaves();
});

Dmin.addEventListener('input', () => {
    activeDMin = Dmin.value;
    loadCaves();
});

Dmax.addEventListener('input', () => {
    activeDMax = Dmax.value;
    loadCaves();
});

// Load caves 
loadCaves();
async function loadCaves() {
  try {
    // URL
    const url = new URL('http://localhost:5000/api/cave/map');

    // Filters
    if (activeLMin !== '') url.searchParams.append('length_min', activeLMin); // This !== '' is for like prevention. Normally if 0 passed down JS won't read because its falsy
    if (activeLMax !== '') url.searchParams.append('length_max', activeLMax); // so add !== '' make JS thinks it might also be '' so it runs
    if (activeDMin !== '') url.searchParams.append('depth_min', activeDMin); // the !== '' thing when the input is empty, .value returns an empty string '', not null or 0
    if (activeDMax !== '') url.searchParams.append('depth_max', activeDMax);

    const res = await fetch(`${url}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Data not found LOL");
    const data = await res.json();
    const caves = data.data;

    console.log(caves);

    loadMarkers(caves);

  } catch (err) {
    console.log(err);
  }
}

// Load markers
let markers = []; // Keep track of markers, so when the loadCaves got called again, it'll knew the previous loaded markers setting and know who to delete

function loadMarkers(caves) { 

    markers.forEach(m => m.remove()); // Remove old markers when new filter loaded. THIS ONLY REMOVES FROM MAP DOESN'T INCLUDE ARRAY
    markers = []; // This is the real remove! I clears array 

  // Load markers
  for (const cave of caves) {
    // Marker
    const marker = L.marker([cave.cave_latitude, cave.cave_longitude])
      .bindTooltip(
        `
            <b>${cave.cave_code} ${cave.cave_name}</b><br>
            Length: ${parseFloat(cave.cave_length) === 0 || cave.cave_length === null ? "Unknown" : cave.cave_length + "m"}<br>
            Depth: ${parseFloat(cave.cave_depth) === 0 || cave.cave_depth === null ? "Unknown" : cave.cave_depth + "m"}<br>
            `,
        { permanent: false, sticky: false },
      ) // Make tooltip disappears when click marker
      .bindPopup(
        `
        <b>${cave.cave_code} ${cave.cave_name} </b><br>
        ${cave.cave_locality}, ${cave.cave_province}<br>
        Exploration status: ${cave.cave_exploration_status}<br>
        Perspect: ${cave.cave_perspect === null ? "Unknown" : cave.cave_perspect}<br>
        Length: ${parseFloat(cave.cave_length) === 0 || cave.cave_length === null ? "Unknown" : cave.cave_length + "m"}<br>
        Depth: ${parseFloat(cave.cave_depth) === 0 || cave.cave_depth === null ? "Unknown" : cave.cave_depth + "m"}<br>
        Coordinates: ${cave.cave_latitude}, ${cave.cave_longitude}
    `,
      )
      .addTo(map);

    markers.push(marker);

    marker.on("click", () => marker.closeTooltip()); // Make tooltip disappears when click marker
  }
}
