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
    def getOutput(self):
        # Create database string
        db_string = f'postgres://vvqxjory:{db_password}@ziggy.db.elephantsql.com:5432/vvqxjory'
        # Create an engine instance
        engine = create_engine(db_string)
        # Connect to PostgreSQL server
        dbConnection = engine.connect()
        # Read data from PostgreSQL database table and load into a DataFrame instance
        output = engine.execute("SELECT * from \"output_positive\" where rare_earth > 0", dbConnection)
        return output

    def getGold(self):
        # Create database string
        db_string = f'postgres://vvqxjory:{db_password}@ziggy.db.elephantsql.com:5432/vvqxjory'
        # Create an engine instance
        engine = create_engine(db_string)
        # Connect to PostgreSQL server
        dbConnection = engine.connect()
        # Read data from PostgreSQL database table and load into a DataFrame instance
        gold = engine.execute("SELECT * from \"gold_country\" ", dbConnection)
        return gold

    def getSilver(self):
        # Create database string
        db_string = f'postgres://vvqxjory:{db_password}@ziggy.db.elephantsql.com:5432/vvqxjory'
        # Create an engine instance
        engine = create_engine(db_string)
        # Connect to PostgreSQL server
        dbConnection = engine.connect()
        # Read data from PostgreSQL database table and load into a DataFrame instance
        silver = engine.execute("SELECT * from \"silver_country\" ", dbConnection)
        return silver

# Need to fix this connection.
    """ def getColorado(self):
        # Create database string
        db_string = f'postgres://vvqxjory:{db_password}@ziggy.db.elephantsql.com:5432/vvqxjory'
        # Create an engine instance
        engine = create_engine(db_string)
        # Connect to PostgreSQL server
        dbConnection = engine.connect()
        # Read data from PostgreSQL database table and load into a DataFrame instance
        colorado = engine.execute("SELECT * from \"Colorado_output\" ", dbConnection)
        return colorado """

app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    return render_template("index.html")


@app.route('/api/v1.0/output_positive',methods=['GET'])  
def getOutput():  
    outputs = []  
    dbUtils = DbUtils()  
    outputData = dbUtils.getOutput()
    for r in outputData:
        a = {"sample_id": r[1], "rare_earth_predict": r[2], "rare_earth": r[3], "latitude": r[4], "longtitude": r[5], "au_ppm": r[6], "ag_ppm": r[7], "sc_ppm": r[9], "y_ppm": r[10], "la_ppm": r[11], "ce_ppm": r[12], "pr_ppm": r[13], "nd_ppm": r[14], "sm_ppm": r[15], "eu_ppm": r[16], "gd_ppm": r[17], "tb_ppm": r[18], "dy_ppm": r[19], "ho_ppm": r[20], "er_ppm": r[21], "tm_ppm": r[22], "yb_ppm": r[23], "lu_ppm": r[24], "country": r[8]}
        outputs.append(a)
      
    return jsonify(outputs) 

@app.route('/api/v1.0/gold',methods=['GET'])  
def getGold():  
    gold = []  
    dbUtils = DbUtils()  
    goldData = dbUtils.getGold()
    for r in goldData:
        a = {"sample_id": r[0], "sample_name": r[1], "latitude": r[2], "longtitude": r[3], "rock_name": r[4], "au_ppm": r[5], "country": r[6]}
        gold.append(a) 

    return jsonify(gold)

@app.route('/api/v1.0/silver',methods=['GET'])  
def getSilver():  
    silver = []  
    dbUtils = DbUtils()  
    silverData = dbUtils.getSilver()
    for r in silverData:
        a = {"sample_id": r[0], "sample_name": r[1], "latitude": r[2], "longtitude": r[3], "rock_name": r[4], "ag_ppm": r[5], "country": r[6]}
        silver.append(a) 

    return jsonify(silver) 

""" @app.route('/api/v1.0/colorado',methods=['GET'])  
def getColorado():  
    colorado = []  
    dbUtils = DbUtils()  
    colData = dbUtils.getColorado()
    for r in colData:
        a = {"sample_id": r[0], "latitude": r[2], "longtitude": r[3], "totmag": r[22], "resmag": r[23], "app_K": r[27], "app_U": r[28], "app_Th": r[29], "U_Th_ratio": r[30], "U_K_ratio": r[31], "Th_K_ratio": r[32], "rare_earth": r[33]}
        # a = {"sample_id": r[0], "latitude": r[2], "longtitude": r[3]}
        colorado.append(a) 

    return jsonify(colorado) """
  
class JSONObject:  
  def __init__( self, dict ):  
      vars(self).update( dict )

if __name__ == "__main__":  
    app.run() 
