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
	center: [45, -30],
	zoom: 2,
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
let mlOutputs = new L.LayerGroup();

// 2. Add a reference group to the overlays object.
let overlays = {
  "Samples": cdnSamples,
  "ML Outputs": mlOutputs
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
     function styleInfo(feature) {
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
        return L.circleMarker(latlng);
      },
    //Set the style for eash circleMarker on the map
    style: styleInfo,

    // Create a popup for each circleMarker to display attribute info
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<b>Sample ID:</b> " + feature.properties.sample_id + "<br><b>Sample Name: </b>" + feature.properties.sample_name + "<br><b>Rock Name: </b>" + feature.properties.rock_name + "<br><b>Rock Type: </b>" + feature.properties.rock_type + "<br><b>Country: </b>" + feature.properties.country);
      }

    }).addTo(cdnSamples);
  

  // Then we add the json layer to our map.
  cdnSamples.addTo(map);

  });

  // Retrieve the API JSON data from ElephantSQL DB.
  d3.json("http://127.0.0.1:5000/api/v1.0/output_positive").then(function(data) {

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
     function styleInfo(feature) {
       return {
      radius: getRadius(feature.properties.rare_earth),
      fillColor: getColor(feature.properties.rare_earth),
      color: "#000000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
      stroke: true
    };
  }

  // This function determines the colour of the marker based on the total number of rare earth minerals
  function getColor(rare_earth) {
    if (rare_earth > 100000) {
      return "#ea2c2c";
    }
    if (rare_earth > 50000) {
      return "#ea822c";
    }
    if (rare_earth > 10000) {
      return "#ee9c00";
    }
    if (rare_earth > 1000) {
      return "#eecc00";
    }
    if (rare_earth < 1000) {
      return "#d4ee00";
    }
    if (rare_earth == 0) {
    return "#98ee00"
    }
  }

  // This function determines the radius of the earthquake marker based on the rare earth totals
  function getRadius(rare_earth) {
    if (rare_earth > 100000) {
      return 20;
    }
    if (rare_earth > 50000) {
      return 15;
    }
    if (rare_earth > 10000) {
      return 10;
    }
    if (rare_earth > 999) {
      return 5;
    }
    if (rare_earth < 1000) {
      return 2.5;
    }
    if (rare_earth === 0) {
    return 1;
    }
  }

    // Creating geoJson layer
    var geoJSON = { type: 'FeatureCollection', features: jsonFeatures};

    L.geoJson(geoJSON, {

      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
    //Set the style for eash circleMarker on the map
    style: styleInfo,

    // Create a popup for each circleMarker to display attribute info
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<b>Sample ID:</b> " + feature.properties.sample_id + "<br><b>RE Predict: </b>" + feature.properties.rare_earth_predict + "<br><b>Rare Earth Total: </b>" + feature.properties.rare_earth + "<br><b>Gold: </b>" + feature.properties.au_ppm + "<br><b>Silver: </b>" + feature.properties.ag_ppm + "<br><b>Country: </b>" + feature.properties.country);
      }

    }).addTo(mlOutputs);
  

  // Then we add the json layer to our map.
  mlOutputs.addTo(map);

  });