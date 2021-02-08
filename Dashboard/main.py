from flask import Flask  
from sampleService import sample_api  
  
app = Flask(__name__)  
app.register_blueprint(sample_api, url_prefix='/sample_api')  
 
@app.route("/")  
def service():  
    return "Service is running!"  
  
if __name__ == "__main__":  
    app.run() 