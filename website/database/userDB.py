from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, jsonify, request

db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    highscore = db.Column(db.Integer)

    def __repr__(self):
        return f'<User {self.username}'
    

user = Blueprint('main', __name__)

@user.route('/add_user/<username>/<email>/<password>', methods=['POST'])
def add_user(email, username, password):
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password or not email:
        return jsonify({'message': 'Invalid input'}), 404
    
    user = User(username=username, email=email, password=password, highscore=0)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': f'User {username} created sucessfully!'})

@user.route('/users/<username>/<password>', methods=['GET'])
def users(username, password):
    users = User.query.filter_by(name=username, password=password)
    if user:
        return jsonify({'id': user.id, 'username': user.username, 'email': user.email, 'password': user.password, 'highscore': user.highscore})
    else:
        return jsonify({'error': 'Invalid username or password'}), 404
                    