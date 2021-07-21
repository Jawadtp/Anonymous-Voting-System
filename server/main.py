from flask import Flask
from flask import request

app = Flask(__name__)

from flask_cors import CORS, cross_origin
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        data = dict(request.form)
        print('Login request received: ')
        print(request.json)
        return jsonify(name='john')
    return "yea"
    
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=False)