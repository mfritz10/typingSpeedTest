from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'fdjadkaldj sfjlsdka'

    from .view import view

    app.register_blueprint(view, url_prefix='/')

    return app
    