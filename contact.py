import enum
from datetime import datetime

from flask_wtf import FlaskForm

from db import Base

from sqlalchemy import Column, DateTime, Enum, Integer, String, Text

from wtforms import SelectField, StringField
from wtforms.fields.html5 import EmailField, TelField
from wtforms.validators import DataRequired, Email, Length
from wtforms.widgets import TextArea


class VisitorType(enum.Enum):

    yoga_student = 'I want to attend the yoga retreat / weekend'
    yoga_teacher = 'I want to organize my event'


class Contact(Base):
    
    __tablename__ = 'contacts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(32))
    country = Column(String(32), default='')
    email = Column(String(64))
    phone = Column(String(32))
    message = Column(Text, default='')
    date_created = Column(DateTime, default=datetime.now())
    visitor = Column(Enum(VisitorType), nullable=False)


# TODO: ADD provides ORM-backed fields
#
#      WTForms-SQLAlchemy:
#      provides ORM-backed fields and form generation from SQLAlchemy models.
#
#      WTForms-Alchemy:
#      provides rich support for generating forms from SQLAlchemy models,
#      including an expanded set of fields and validators.
class ContactForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=32)])
    country = StringField('Country')
    email = EmailField('Email', validators=[DataRequired(), Email()])
    phone = TelField('Phone number', validators=[DataRequired()])
    message = StringField('Message', widget=TextArea())
    visitor = SelectField('Please choose the right option',
                          choices=[(visitor.name, visitor.value)
                                   for visitor in VisitorType])
