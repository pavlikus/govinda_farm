from flask import Flask
from flask import redirect, request, render_template, url_for

from db import db_session
from settings import Config

from blog.views import blog
from events.views import event

from contact.models import Contact
from contact.forms import ContactForm
from modules import storage

from flask_security import Security, SQLAlchemySessionUserDatastore
from security.models import User, Role
from security.forms import SecurityRegisterForm


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = True

user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
security = Security(app, user_datastore, register_form=SecurityRegisterForm)

storage.init_app(app)

app.register_blueprint(blog, url_prefix='/blog/')
app.register_blueprint(event, url_prefix='/events/')


@app.route('/')
def home_page():
    return render_template('index.html', name='index')


@app.route('/contact/', methods=('GET', 'POST'))
def contact_page():
    form = ContactForm()
    if request.method == 'POST' and form.validate_on_submit():
        contact = Contact()
        form.populate_obj(contact)
        db_session.add(contact)
        db_session.commit()
        return redirect(url_for('contact_page', success=True))
    return render_template('contact.html', name='contact', form=form)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
