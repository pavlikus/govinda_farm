import enum
from datetime import datetime

from db import Base

from sqlalchemy import Column, DateTime, Enum, Integer, String, Text


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
