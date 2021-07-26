from flask import Flask
from flask import request
from flask import jsonify
import psycopg2
from flask_cors import CORS, cross_origin

from datetime import datetime, timezone

conn = psycopg2.connect("dbname=anon user=Jawadtp")

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    print('email: '+request.json['email'])
    print('password: '+request.json['password'])
    return jsonify({"Email": request.json['email'], "Password":
                                    request.json['password']})
    

@app.route('/register', methods = ['GET', 'POST'])
@cross_origin()
def register():
    '''
    print('email: '+request.json['email'])
    print('password: '+request.json['password'])
    '''
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    current_time = datetime.now(timezone.utc) 

    
    try:
        cur = conn.cursor()
        
        
        cur.execute("SELECT username, email FROM accounts WHERE username=%s OR email=%s limit 1",(username, email))
        
        res = cur.fetchone()

        if(cur.rowcount):
            if res[0]==username:
                return jsonify({"error": 'username'})
            
            if res[1]==email:
                return jsonify({"error": 'email'})
        
        cur.execute("INSERT INTO accounts (username, password, email, createdon) VALUES (%s,%s,%s, %s)",(username, password, email, current_time))
        cur.close()
        conn.commit()
        print("User registration successful")
        return jsonify({"status": 'success'})

    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})
    
    

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=False)