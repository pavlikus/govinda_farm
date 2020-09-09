from flask import Flask
from flask import render_template

from db import db_session
from settings import Config

from blog.views import blog
from events.views import event

from modules import storage


app = Flask(__name__)
app.config.from_object(Config)

storage.init_app(app)

app.register_blueprint(blog, url_prefix='/blog/')
app.register_blueprint(event, url_prefix='/events/')

@app.route('/')
def hello_world():
    return render_template('index.html', name='index')


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
