
## Database Week 1 & 2

### Data

The data that we obtained for this project was downloaded from
https://zenodo.org/record/3359791#.YAoyiuhKiUm and consisted of multiple CSV files. The CSV files are normalized tables from the complete.csv file which contains all the tables combined with over 1M
records.

### Method

We used Pandas to clean the data removing any attributes from the tables that are not useful for the analysis. Pandas and sqlalchemy was also used to create a table in a database in PostgreSQL and populate with the clean_df. There is a working example in Resources/CleaningData.ipynb file.

### Entity Relationship Diagram (ERD)

The following image is a screen shot of the relationships between the tables.

![ERD:](Resources/ERD_DB.png)

### SQL

The image below shows a sample part of the code the creates all the necessary tables in PostgreSQL. This code was generated through setting up the ERD using the website https://app.quickdatabasediagrams.com/#/d/cjLvSq. The full SQL file is in the SQL folder.

![SQL:](Resources/CreateTable_SQL.png)

The following image shows and SQL statement thank joins the Major, Trace, and Computed tables to the Sample table.

![Table Joins:](Resources/TableJoin.png)

### PostgreSQL

The screenshot below shows a sample of the data in the Sample table in PostgreSQL. We will explore writing SQL code to create table joins and query the attributes for mapping and machine learning purposes.

![PostgreSQL:](Resources/PostgreSQL.png)
