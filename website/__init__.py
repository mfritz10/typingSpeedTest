from flask import Flask
from .database.userDB import db


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'fdjadkaldj sfjlsdka'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRICK_MODIFICATIONS'] = False

    db.init_app(app)


    from .view import view
    app.register_blueprint(view, url_prefix='/')

    from .database.userDB import user
    app.register_blueprint(user)

    return app
    