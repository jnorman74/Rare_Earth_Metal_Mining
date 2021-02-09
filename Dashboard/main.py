from flask import Flask
from flask_cors import CORS
from sampleService import sample_api  
  
app = Flask(__name__)
CORS(app) 
app.register_blueprint(sample_api, url_prefix='/sample_api')  
 
@app.route("/")  
def service():  
    return "Service is running!"  
  
if __name__ == "__main__":  
    app.run() 