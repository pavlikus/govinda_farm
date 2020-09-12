from flask_security.forms import RegisterForm

from wtforms import StringField
from wtforms.validators import DataRequired


class SecurityRegisterForm(RegisterForm):

    username = StringField('Name', validators=[DataRequired()])
