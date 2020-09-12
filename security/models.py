from db import Base

from flask_security import RoleMixin, UserMixin

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import backref, relationship


class RolesUsers(Base):

    __tablename__ = 'roles_users'

    id = Column(Integer(), primary_key=True)
    user_id = Column('user_id', Integer(), ForeignKey('users.id'))
    role_id = Column('role_id', Integer(), ForeignKey('roles.id'))


class Role(Base, RoleMixin):

    __tablename__ = 'roles'

    id = Column(Integer(), primary_key=True)
    name = Column(String(64), unique=True)
    description = Column(String(256))


class User(Base, UserMixin):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(64), unique=True)
    username = Column(String(64))
    password = Column(String(128))
    last_login_at = Column(DateTime())
    current_login_at = Column(DateTime())
    last_login_ip = Column(String(128))
    current_login_ip = Column(String(128))
    login_count = Column(Integer)
    active = Column(Boolean())
    confirmed_at = Column(DateTime())
    roles = relationship('Role', secondary='roles_users',
                         backref=backref('users', lazy='dynamic'))
