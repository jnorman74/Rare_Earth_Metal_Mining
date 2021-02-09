from flask import Blueprint  
from flask import Flask, abort, request, jsonify  
import json  
from flask import jsonify  
from dbUtils import DbUtils  
  
sample_api = Blueprint('sample_api', __name__)  
 
@sample_api.route('/getsamples',methods=['GET'])  
def getSample():  
    samples = []  
    dbUtils = DbUtils()  
    samplesData = dbUtils.getSample()
    for r in samplesData:
        a = {"sample_id": r[0], "sample_name": r[1], "latitude": r[2], "longtitude": r[3], "rock_name": r[4]}
        samples.append(a)
      
    return jsonify(samples) 
  
class JSONObject:  
  def __init__( self, dict ):  
      vars(self).update( dict )