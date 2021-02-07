// Add console.log to check to see if our code is working.
console.log("working");


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,  accessToken: API_KEY});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,  accessToken: API_KEY});// Create a base layer that holds both maps.


// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);


// Accessing the airport GeoJSON URL
let quakeData = "https://raw.githubusercontent.com/sholkojr/Rare_Earth_Metal_Mining/JaniceWeek2/file.geojson";

// Grabbing our GeoJSON data.
d3.json(quakeData).then(function(data) {
  console.log(data);
  
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into two separate functions
// to calculate the color and radius.
function styleInfo(feature) {
  return {

    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.rare_earth_predict),
    color: "#000000",
    radius: getRadius(feature.properties.rare_earth_predict),
    stroke: true,
    weight: 0.5
  };
};

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 0.5) {
    return "#ea2c2c";
  }
  return "#98ee00";
};




// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 5;
};


// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  pointToLayer:function(feature,latlng) {
    console.log(data);
    return L.circleMarker(latlng);},
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
    onEachFeature: function(feature, layer) {layer.bindPopup("Rare Earth,ppm: " + feature.properties.rare_earth+ "<br>Rare EArth Predict: " + feature.properties.rare_earth_predict  + "<br>Gold: " + feature.properties.au_ppm + "<br>Silver: " + feature.properties.au_ppm);}
})

.addTo(earthquakes);
});

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});
// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1];
  const colors = [
    "#98ee00",
    "#ea2c2c"
  ];
    //? Basically an if, condition if true: condition if false after it 
    //i +1 = if the next item exists, then true, at end = false
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
    };

legend.addTo(map);


earthquakes.addTo(map);
