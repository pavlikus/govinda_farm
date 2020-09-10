from flask import Flask
from flask import redirect, request, render_template, url_for

from db import db_session
from settings import Config

from blog.views import blog
from events.views import event

from contact import Contact, ContactForm
from modules import storage



app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = True

storage.init_app(app)

app.register_blueprint(blog, url_prefix='/blog/')
app.register_blueprint(event, url_prefix='/events/')


@app.route('/')
def home_page():
    return render_template('index.html', name='index')


@app.route('/contact/', methods=('GET', 'POST'))
def contact_page():
    form = ContactForm()
    if form.validate_on_submit():
        data = form.data
        del data['csrf_token']
        contact = Contact(**data)
        db_session.add(contact)
        db_session.commit()
        return redirect(url_for('contact_page', success=True))
    return render_template('contact.html', name='contact', form=form)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
