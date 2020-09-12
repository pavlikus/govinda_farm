class Config(object):

    DEBUG = True
    TESTING = True
    SECRET_KEY = 'wv9_9tOvKs-vfadhf-c-KGYuUr0YZ0X2n7mNcPq63iMAMr9VsKF4J4Izco1Lvc92ND0JwaRV5RtmILlqbLNcIA'
    TEMPLATES_AUTO_RELOAD = True
    DATABASE_URI = 'sqlite:///db.sqlite3'
    MEDIA_PATH = 'media/cache/'
    # PREFERRED_URL_SCHEME = 'http'
    # SESSION_COOKIE_SECURE = False
    # SESSION_COOKIE_HTTPONLY = True

    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_SALT = '3qCxpW9BaSr-L2euG4xb0g'
    SECURITY_REGISTERABLE = True
    SECURITY_LOGIN_URL = '/login/'
    SECURITY_LOGOUT_URL = '/logout/'
    SECURITY_REGISTER_URL = '/register/'
    SECURITY_SEND_REGISTER_EMAIL = False
