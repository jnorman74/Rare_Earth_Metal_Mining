from flask import Blueprint  
from flask import Flask, abort, request, jsonify  
import json  
from flask import jsonify  
from dbUtils import DbUtils  
  
sample_api = Blueprint('sample_api', __name__)  
 
@sample_api.route('/getsamples')  
def getSample():  
    samples = []  
    dbUtils = DbUtils()  
    samplesData = dbUtils.getSample()
    for r in samplesData:
        a = {"sample_id": r[0], "latitude": r[1], "longtitude": r[2]}
        samples.append(a)
      
    return jsonify(samples) 
  
class JSONObject:  
  def __init__( self, dict ):  
      vars(self).update( dict )