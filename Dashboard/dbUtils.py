#database
from sqlalchemy import create_engine
from sqlalchemy import join
from sqlalchemy.sql import select

#from config import db_password
import psycopg2
from config import db_password

class DbUtils:
    def getSample(self):
        # Create database string
        db_string = f'postgres://vvqxjory:{db_password}@ziggy.db.elephantsql.com:5432/vvqxjory'
        # Create an engine instance
        engine = create_engine(db_string)
        # Connect to PostgreSQL server
        dbConnection = engine.connect()
        # Read data from PostgreSQL database table and load into a DataFrame instance
        sample = engine.execute("SELECT * from \"Sample\" where country_id = 32", dbConnection)
        return sample