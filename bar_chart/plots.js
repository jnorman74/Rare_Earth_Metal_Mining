// Add console.log to check to see if our code is working.
console.log("working");
var jsonFeatures = [];

//calls the data output function 
data_output();

function data_output(){
  console.log("in data output")
  // Retrieve the API JSON data from ElephantSQL DB.
  d3.json("http://127.0.0.1:5000/api/v1.0/output_positive").then(function(data) {

    // Restructure the JSON data to geoJSON
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
      }
      )
        //console log for the Sample Points and test the syntax for sample id etc..working!
        //console.log(jsonFeatures) 
        //console.log(jsonFeatures[1])
        //console.log(jsonFeatures[3].properties.au_ppm)
        console.log(jsonFeatures[4].properties.sample_id)

          // Grab a reference to the dropdown select element
          var selector = d3.select("#selDataset");

          myArray=[];

          for (var i = 1; jsonFeatures.length; i++){

            //console.log(jsonFeatures[i].properties.sample_id)

            //myArray.push(jsonFeatures[i].properties.sample_id)


          selector
          .append("option")
          .text(jsonFeatures[i].properties.sample_id)
          .property("value", jsonFeatures[i].properties.sample_id);
          }  
        //This works and pushes the whole array
          //console.log(myArray)     
                   
  })};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);     
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  
  d3.json("http://127.0.0.1:5000/api/v1.0/output_positive").then(function(data) {

    // Restructure the JSON data to geoJSON
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
      }
      )


      //let information =jsonfeatures
      var information = jsonFeatures;

      // Filter the data for the object with the desired sample number, used for all charts
      var resultArray2 = information.filter(sampleObj => sampleObj.properties.sample_id == sample);
      var result = resultArray2[0];
      console.log(result)



     //bar chart
       // create an array that holds the information 

       var data = [
          {
          x: ['Rare Earth PPM', 'Silver PPM', 'Gold PPM'], 
          y: [result.properties.rare_earth, result.properties.au_ppm, result.properties.ag_ppm],
          type: 'bar'
          }     
       ];

 
       Plotly.newPlot('bar_chart', data);

   
    }
      
    )
    };
    