from flask import abort
from flask import Blueprint
from flask import render_template

from .models import Event, Guru

event = Blueprint('events', __name__)


@event.route('/')
def index():

    events = Event.query.all()
    return render_template('events/index.html',
                           events=events)


@event.route('/<slug>/')
def event_page(slug):

    event = Event.query.filter(Event.slug == slug).first()
    if event is None:
        abort(404)
    return render_template(f"events/event_{event.event_type.name}.html",
                           event=event)
