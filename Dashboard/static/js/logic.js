// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the third tile layer that will be the background of our map.
let darkBack = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [45, -30],
	zoom: 1,
	layers: [streets]
});

// Create a base layer that holds all maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": darkBack
};

// Add a layer group.
//let cdnSamples = new L.LayerGroup();
let mlOutputs = new L.LayerGroup();
let goldPPM = new L.LayerGroup();
let silverPPM = new L.LayerGroup();
// let colMagRad = new L.LayerGroup();

// Add a reference group to the overlays object.
let overlays = {
  // "Samples": cdnSamples,
  "Rare Earth PPM": mlOutputs,
  "Gold PPM": goldPPM,
  "Silver PPM": silverPPM
 // "Colorado Mag/Rad": colMagRad
};

// Then we add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


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

     // Style options for the Sample Points
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
    if (rare_earth >= 100000) {
      return "#a50f15";
    }
    if (rare_earth >= 50000) {
      return "#de2d26";
    }
    if (rare_earth >= 10000) {
      return "#fb6a4a";
    }
    if (rare_earth >= 5000) {
      return "#fc9272";
    }
    if (rare_earth >= 1000) {
      return "#fcbba1";
    }
    if (rare_earth > 0) {
    return "#fee5d9"
    }
  }

  // This function determines the radius of the earthquake marker based on the rare earth totals
  function getRadius(rare_earth) {
    if (rare_earth >= 100000) {
      return 30;
    }
    if (rare_earth >= 50000) {
      return 20;
    }
    if (rare_earth >= 10000) {
      return 15;
    }
    if (rare_earth >= 5000) {
      return 10;
    }
    if (rare_earth >= 1000) {
      return 5;
    }
    if (rare_earth > 0) {
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

  // Create a legend control object
  let legend = L.control({
    position: "bottomright"
  });

  // Add details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    const rare_earth = [700000, 100000, 50000, 10000, 5000, 1000];
    const colors = [
      "#a50f15",
      "#de2d26",
      "#fb6a4a",
      "#fc9272",
      "#fcbba1",
      "#fee5d9"
    ];

// loop through intervals to generate a label with a coloured square for each interval
    for (var i = 0; i < rare_earth.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        rare_earth[i] + (rare_earth[i + 1] ? "&ndash;" + rare_earth[i + 1] + "<br>" : "+");
    }
    return div;

  };

  // Add legend to the map
  legend.addTo(map);

  // Retrieve the API JSON data from ElephantSQL DB.
  d3.json("http://127.0.0.1:5000/api/v1.0/gold").then(function(data) {

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

     // Style options for the Sample Points
     function styleInfo(feature) {
      return {
     radius: getRadius(feature.properties.au_ppm),
     fillColor: getColor(feature.properties.au_ppm),
     color: "#000000",
     weight: 0.5,
     opacity: 1,
     fillOpacity: 0.8,
     stroke: true
   };
 }

 // This function determines the colour of the marker based on the total number of rare earth minerals
 function getColor(au_ppm) {
   if (au_ppm >= 100000) {
     return "#993404";
   }
   if (au_ppm >= 10000) {
     return "#d95f0e";
   }
   if (au_ppm >= 1000) {
     return "#fe9929";
   }
   if (au_ppm >= 100) {
     return "#fec44f";
   }
   if (au_ppm >= 1) {
     return "#fee391";
   }
   if (au_ppm < 1) {
   return "#ffffd4"
   }
 }

 // This function determines the radius of the earthquake marker based on the rare earth totals
 function getRadius(au_ppm) {
   if (au_ppm >= 100000) {
     return 30;
   }
   if (au_ppm >= 10000) {
     return 25;
   }
   if (au_ppm >= 1000) {
     return 20;
   }
   if (au_ppm >= 100) {
     return 15;
   }
   if (au_ppm >= 10) {
     return 10;
   }
   if (au_ppm < 10) {
   return 2.5;
   }
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
        layer.bindPopup("<b>Sample ID:</b> " + feature.properties.sample_id + "<br><b>Sample Name: </b>" + feature.properties.sample_name + "<br><b>Rock Name: </b>" + feature.properties.rock_name + "<br><b>Gold PPM: </b>" + feature.properties.au_ppm + "<br><b>Country: </b>" + feature.properties.country);
      }

    }).addTo(goldPPM);
  

  // Then we add the json layer to our map.
  //goldPPM.addTo(map);

  });

// Create a legend control object
let legend2 = L.control({
  position: "bottomright"
});

// Add details for the legend
legend2.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const au_ppm = [500000, 100000, 50000, 10000, 5000, 1000];
  const colors = [
    "#993404",
    "#d95f0e",
    "#fe9929",
    "#fec44f",
    "#fee391",
    "#ffffd4"
  ];

// loop through intervals to generate a label with a coloured square for each interval
  for (var i = 0; i < au_ppm.length; i++) {
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      au_ppm[i] + (au_ppm[i + 1] ? "&ndash;" + au_ppm[i + 1] + "<br>" : "+");
  }
  return div;

};

/* // Add legend to the map
legend2.addTo(map); */

// Retrieve the API JSON data from ElephantSQL DB.
d3.json("http://127.0.0.1:5000/api/v1.0/silver").then(function(data) {

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

     // Style options for the Sample Points
     function styleInfo(feature) {
      return {
     radius: getRadius(feature.properties.ag_ppm),
     fillColor: getColor(feature.properties.ag_ppm),
     color: "#000000",
     weight: 0.5,
     opacity: 1,
     fillOpacity: 0.8,
     stroke: true
   };
 }

 // This function determines the colour of the marker based on the number of gold ppm
 function getColor(ag_ppm) {
   if (ag_ppm >= 1000) {
     return "#4a1486";
   }
   if (ag_ppm >= 500) {
     return "#6a51a3";
   }
   if (ag_ppm >= 100) {
     return "#807dba";
   }
   if (ag_ppm >= 50) {
     return "#9e9ac8";
   }
   if (ag_ppm >= 10) {
     return "#bcbddc";
   }
   if (ag_ppm >= 1) {
   return "#dadaeb"
   }
   if (ag_ppm <1) {
     return "#f2f0f7"
   }
 }

 // This function determines the radius of the earthquake marker based on the rare earth totals
 function getRadius(ag_ppm) {
   if (ag_ppm >= 5000) {
     return 25;
   }
   if (ag_ppm >= 500) {
     return 20;
   }
   if (ag_ppm >= 100) {
     return 15;
   }
   if (ag_ppm >= 50) {
     return 10;
   }
   if (ag_ppm >= 10) {
     return 5;
   }
   if (ag_ppm >= 1) {
   return 2.5;
   }
   if (ag_ppm < 1) {
     return 1;
   }
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
        layer.bindPopup("<b>Sample ID:</b> " + feature.properties.sample_id + "<br><b>Sample Name: </b>" + feature.properties.sample_name + "<br><b>Rock Name: </b>" + feature.properties.rock_name + "<br><b>Silver PPM: </b>" + feature.properties.ag_ppm + "<br><b>Country: </b>" + feature.properties.country);
      }

    }).addTo(silverPPM);
  

  // Then we add the json layer to our map.
  //silverPPM.addTo(map);

  });

  // Create a legend control object
let legend3 = L.control({
  position: "bottomleft"
});

// Add details for the legend
legend3.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const ag_ppm = [5000, 500, 100, 50, 10, 1];
  const colors = [
    "#4a1486",
    "#6a51a3",
    "#807dba",
    "#9e9ac8",
    "#bcbddc",
    "#dadaeb"
  ];

// loop through intervals to generate a label with a coloured square for each interval
  for (var i = 0; i < ag_ppm.length; i++) {
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      ag_ppm[i] + (ag_ppm[i + 1] ? "&ndash;" + ag_ppm[i + 1] + "<br>" : "+");
  }
  return div;

};

/* // Add legend to the map
legend3.addTo(map); */

// Add and remove legend from layers
map.on('overlays', function (eventLayer) {
  // Switch to the Rare Earth legend...
     if (eventLayer.name === 'mlOutputs') {
         map.removeControl(legend1);
         legend2.addTo(map);}
         // switch to the Gold legend...
    else {
         map.removeControl(legend2);
         legend1.addTo(map);}

    });
    