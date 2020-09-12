from flask_wtf import FlaskForm

from wtforms import SelectField, StringField
from wtforms.fields.html5 import EmailField, TelField
from wtforms.validators import DataRequired, Email, Length
from wtforms.widgets import TextArea

from .models import VisitorType


# TODO: ADD provides ORM-backed fields
#
#      WTForms-SQLAlchemy:
#      provides ORM-backed fields and form generation from SQLAlchemy models.
#
#      WTForms-Alchemy:
#      provides rich support for generating forms from SQLAlchemy models,
#      including an expanded set of fields and validators.
class ContactForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(),
                                           Length(min=2, max=32)])
    country = StringField('Country')
    email = EmailField('Email', validators=[DataRequired(),
                                            Email()])
    phone = TelField('Phone number', validators=[DataRequired()])
    message = StringField('Message', widget=TextArea())
    visitor = SelectField('Please choose the right option',
                          choices=[(visitor.name, visitor.value)
                                   for visitor in VisitorType])
