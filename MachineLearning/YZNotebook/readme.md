# Rare_Earth_Metal_Mining-Machine Learning Week 2
## Refine, Train and Test the Model
		
During the second segment, my task is focusing one machine learning model and further develop it. Since in week 1, we already accomplished a lot in machine learning aspect, we got the preliminary results, so this week, my focus is on refining the model, bring in more features for analysis, examing the model, and etc. 
In the following context, I will explain the machine learning code in segments. 

### Import data, tie into database
For the past two weeks, our team has been working on a share database using Elephant SQL. Elephant SQL allows our team to work off from the same database, instead of reading database from local resources. In the jupyter notebook, the source database (tables) merged together and read into the notebook as a dataframe. 

### Insepct and clean up the database
In this segment, the imported database is inspected and cleaned up for further analysis. 
First, the columns of the database was inspected using df.columns.tolist() function. After browsing the entire list of the columns, the columns that are in the interest of analysis were dropped. 
Next, a new column "rare_earth" were created by adding up all the rare earth elements. The machine learning model will be based on the total concentration of the REEs instead of individual REE. 
Up till this step, it is similar to lask segment's machine learning model. 

### Inspect unique values of rock name, rock_type, country, and method. 
After inspecting and cleanning up step, the data base has four more features that were not included in the previous segment's analysis, that is: rock_name, rock_type, country, and method. These features were not included since the entries are non-numerical. In this segment, these four features will be further inspected and transform in to numerical features (encoding). 
First, the unique values of these four features were displayed using function df["column"].unique(). It turns out, values for rock_name and method are too "unique" for each entries. Although the encoding process maybe feasible for these two features, we don't believe it will be benificial in the following machine learning step. As a result, columns "Rock_name" and "Method" were dropped. 

### Get Counts for each unique values of "rock_type" and "country"
Counts for each unique vavlues were displayed using function "df.column.value_counts(). Counts distribusion was visulized using column.plot.density(). After inspecting the value counts distribusion, rock_type has counts that is lower than 3,000 were grouped together and replaced as "Other"; Slimiar to "country" which has a count lower than 5000. 
		
### Encoding
Apply encoding process to the "country" and "rock_type", so the non-numerical features were transformed to numerical feature. 
		
### Machine Learning
The same machine learning steps were applied to the dataframe. 
According to the SHAP value, the concentrations of th, nb, zr and P205 have strong positive correlations with REE concentration, while Al203 has a strong negative correlation with REE concentration. 
The feature importance were also displayed. country and rock_type has scores of 28 and 26 respectively. These are not very high score comparing to th, sr, nb concentrations (scores of these features are 211, 153 and 151 respectively). 
		
### Make predictions with test data set
These are standard machines learning steps, which were developed at the previous segment already. 

### Evaluate the Model
The confusion matrix and accuracy score were displayed. The model has a accuracy score of 0.985. The precision score for possitive and negatives are 0.91 and 0.99 respectively, which indicating the model works very well. 
		
### Show data on the Maps
This part is also developed in the previous segment. The following imgaine displayed the results. Since rock_type and country are not high score features, the predictions are not very much different from previous results. 
		

		



