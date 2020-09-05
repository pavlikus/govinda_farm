from sqlalchemy import Column, Integer, String, Text
from db import Base


class Event(Base):

    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    name = Column(String(64))
    description = Column(Text)
