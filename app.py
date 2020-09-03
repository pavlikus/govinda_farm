from flask import Flask
from flask import render_template

from db import db_session


app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html', name='index')


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
