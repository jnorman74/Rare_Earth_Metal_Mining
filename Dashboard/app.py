#database
from sqlalchemy import create_engine
from sqlalchemy import join
from sqlalchemy.sql import select
#flask
from flask_cors import CORS 
from flask import Flask, abort, request, jsonify, json, render_template
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
        sample = engine.execute("SELECT * from \"canada_samples\" ", dbConnection)
        return sample

app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route('/api/v1.0/cdn_samples',methods=['GET'])  
def getSample():  
    samples = []  
    dbUtils = DbUtils()  
    samplesData = dbUtils.getSample()
    for r in samplesData:
        a = {"sample_id": r[0], "sample_name": r[1], "latitude": r[2], "longtitude": r[3], "rock_name": r[4], "rock_type": r[5], "country": r[6]}
        samples.append(a)
      
    return jsonify(samples) 
  
class JSONObject:  
  def __init__( self, dict ):  
      vars(self).update( dict )

if __name__ == "__main__":  
    app.run() 
