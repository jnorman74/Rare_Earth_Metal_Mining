#Machine Learning Week 1

## Introduction,methodology and exploratory data analysis

The main dataset has about 1 million data points from all over the world and is mostly the results of chemical assaying for minerals.  The datapoints were drill core or similar. 

Rare earths are a hot topic right now in mining with limited supplies concentrated in China.  Demand is increasing with the rise in complex electronics.  

The goal of this project is to predict where rare earth minerals are concentrated using the concentration of other minerals.  In typical drill core, rare earth minerals would not be commonly assayed due to cost.
Therefore, it is useful to correlate rare earth elements with other more commonly assayed components. 

Exploratory data analysis was completed showing the distributions of individual rare earth elements via histograms.  Note the log distribution. 

![rare_earth_dist1](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/rareearthdist1.png)

![rare_earth_dist2](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/rare_earth_dist2.png)

The 17 rare earth elements were added together to create the a "rare earth" value in parts per million. 

![TotalRareEarthDist](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/TotalRareEarthDist.png)


The complete dataset had many extra features such as datasources, rock type etc.  These features were mainly dropped for this initial machine learning model. 
The focus of the week one analysis was on the concentrations of other elements and if these could be used to predict high concentrations of the rare earth elements. 

The dataset of 1 million points did not have complete data for the rare earths.  There were about 100,000 data points with rate earth information present.
The 100,000 data points with rare earth information present was used for the machine learning model.  The model results were then used on the entire dataset to predict where rare earths might exist. 

A correlation matrix was completed to determine if there were any correlations between the rare earth elements and other elements.  
The did appear to be some positive and negative correlations amongst other minerals, so the project appeared to be worth pursuing. 

![Corr_matrix](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/Corr_matrix.png)


## Machine Learning Model 

This dataset was fairly sparse with many missing values.  The best model to handle a spare data set without additional feature engineering is a tree-based model. For the XGBoost model, data normalization is not required and was not completed.  

Two XGBoost (Extreme Gradient Boosting) tree models were attempted.  An XGBoost regression model did not do very well - likely due to the small number of datapoints with high concentrations of rare earths.

A XGBoost classification model was then attempted. The rare earth data was divided into zero and ones based on rare earth concentration.  Initially a cut-off of 100 ppm was used and yielded good results.  As the cut-off increased, the model became even more accurate and the important features even more pronounced.  A cut-off of 500 was usesd in the last interation with good results. At this cut-off, there were about 1000 positive datapoints and 99,000 negative datapoints.  An accuracy score of 99.5% was achieved with a cut-off of 500 ppm.

A shap plot was used to determine feature importance. 

![shap_plot](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/Shap.png)

There is a strong positive correlation between high concentrations of rare earth elements and: 
- Thorium
- Niobium
- Hafnium
- Lead, metallic
- Gallium
- Zirconium
- Strontium
- Barium
- Lead oxide
- Cobalt
- Manganese oxide

There is a strong negative correlation between high correlations of rare earth elements and: 
- Aluminum oxides
- Chrome
- Sodium oxides
- Vanadium
- Uranium
- Rubidium
- LOI (ie hydrated or weathered ores)

The model was then used to determine where high concentrations of rare earths might exist - the entire dataset of a million points was used.  There were approximately 6000 positives points and 1 million negatives.  Subtracting off the original assays with higher than 500 ppm rare earths (about 1000), this is a find of another 5000 datapoints that predict rare earths.  

The positive and negative finds were plotted on world maps. 

![negative](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/Negative.png)

![positive](https://github.com/sholkojr/Rare_Earth_Metal_Mining/blob/janice/Graphics/Positive.png)


















