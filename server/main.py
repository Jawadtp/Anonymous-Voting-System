import db

from flask import Flask
from flask import request
from flask import jsonify
import psycopg2
from flask_cors import CORS, cross_origin


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import datetime, timezone

conn = psycopg2.connect("dbname=anon user=Jawadtp")

app = Flask(__name__)

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!

jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello():
    return 'Hello, World!'




@app.route("/protected", methods=["GET"])
@jwt_required()
@cross_origin()
def protected():
    '''
    email = get_jwt_identity()
    #username = db.getUsernameFromEmail(email)
    return jsonify(user=email)
    '''
    email = get_jwt_identity()
    username = db.getUsernameFromEmail(email)
   # return jsonify('hello')
    return jsonify({'username':username,'email':email})
@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    email = request.json['email']
    password = request.json['password']

    try:
        cur = conn.cursor()       
        cur.execute("SELECT EXISTS(select 1 from accounts where email=%s AND password=%s)",(email, password))        
        res = cur.fetchone()
        
        if(res[0]):
            #return jsonify({"status": "success"})
            access_token=create_access_token(identity=email)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"error": 'no account'})
        
        #return jsonify({"Result": res[0]})

    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})

    return jsonify({"error": 'weird'})
    

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
        access_token=create_access_token(identity=email)
        return jsonify(access_token=access_token)

    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})
    
    

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=False)