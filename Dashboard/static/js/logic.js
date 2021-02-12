// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the third tile layer that will be the background of our map.
let darkBack = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [darkBack]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": darkBack
};

// Add a layer group.
let cdnSamples = new L.LayerGroup();

// 2. Add a reference group to the overlays object.
let overlays = {
  "Samples": cdnSamples,
};

// Then we add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

  // Retrieve the API JSON data from ElephantSQL DB.
  d3.json("http://127.0.0.1:5000/api/v1.0/cdn_samples").then(function(data) {

    // Restructure the JSON data to geoJSON
    var jsonFeatures = [];

    data.forEach(function(point){
      var lat = point.latitude;
      var lon = point.longtitude;

      var feature = {type: 'Feature',
          properties: point,
          geometry: {
              type: 'Point',
              coordinates: [lon,lat]
          }
        };

        jsonFeatures.push(feature);
        
    });

     //Style options for the Sample Points
     function styleInfo(featrure) {
       return {
      radius: 8,
      fillColor: "Red",
      color: "Red",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
      stroke: true
    };
  }
    var geoJSON = { type: 'FeatureCollection', features: jsonFeatures};

    L.geoJson(geoJSON, {

      pointToLayer: function(feature, latlng) {
        console.log(geoJSON);
        return L.circleMarker(latlng);
      },
    //Set the style for eash circleMarker on the map
    style: styleInfo,

    // Create a popup for each circleMarker to display attribute info
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<b>Sample ID:</b> " + feature.properties.sample_id + "<br><b>Sample Name: </b>" + feature.properties.sample_name + "<br><b>Rock Name: </b>" + feature.properties.rock_name + "<br><b>Rock Type: </b>" + feature.properties.rock_type + "<br><b>Country: </b>" + feature.properties.country);
      }

    }).addTo(cdnSamples);

    /* var lat_longs = []
    data.forEach(d => {
      lat_longs.push(L.marker(d['latitude'], d['longitude']))
      console.log(lat_longs) */

      
  /* let LayerGroup = data.map(d => L.marker(d['latitude'], d['longitude'])
    .bindPopup(`This point is ${d['sample_name']}`))

  L.layerGroup([LayerGroup])
      .addLayer(cdnSamples)
      .addTo(map); */
  

  // Then we add the json layer to our map.
  cdnSamples.addTo(map);

  });