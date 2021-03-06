import db

from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import pytz
from dateutil import parser



app = Flask(__name__)

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!

jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "*"}})



@app.route("/protected", methods=["GET"])
@jwt_required()
@cross_origin()
def protected():
    email = get_jwt_identity()
    username = db.getUsernameFromEmail(email)
    return jsonify({'username':username,'email':email})


@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    email = request.json['email']
    password = request.json['password']

    try:
        userExists = db.doesUserExist(email,password)

        if(userExists):
            access_token=create_access_token(identity=email)
            return jsonify(access_token=access_token)

        else:
            return jsonify({"error": 'Invalid email or password'})
        

    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})

    return jsonify({"error": 'weird'})
    

@app.route('/register', methods = ['GET', 'POST'])
@cross_origin()
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    try:
        isUnique = db.areUsernameAndEmailUnique(email, username)
        
        if isinstance(isUnique, list):
            return jsonify({'error': isUnique[1]})
        
        res = db.createAccount(email, username, password) #Returns true if account creation is successful. Otherwise, it returns a string which explains the error occured.

        if isinstance(res, bool):
            print("User registration successful")
            access_token=create_access_token(identity=email)
            return jsonify(access_token=access_token)

        else:
            return jsonify({'error': res})
        
    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})
    


def getISTDate(dateString):    #Time in Z string format is converted to IST
    IST = pytz.timezone('Asia/Kolkata')
    dateString = parser.parse(dateString)
    return dateString.astimezone(IST).isoformat()


@app.route('/create', methods = ['POST'])
@jwt_required()
@cross_origin()
def createPoll():

    name = request.json['name']
    desc = request.json['desc']
    startTime = getISTDate(request.json['starttime']) 
    expiryTime = getISTDate(request.json['expirytime'])
    email = get_jwt_identity()
    questions = request.json['questions']

    pollId = db.createPoll(name, desc, startTime, expiryTime, email)

    print(questions)

    if isinstance(pollId, int):
        print('Poll added to polls table successfully..')
        db.addPollQuestions(pollId, questions)
        return jsonify({'sucesss':'poll added, poll ID: '+ str(pollId)})

    else:
        return jsonify({'error': pollId})



if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=False)