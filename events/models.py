from datetime import datetime

from sqlalchemy import Column, Date, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from flask_image_alchemy.fields import StdImageField

from modules import storage
from db import Base
from slugify import slugify


class Event(Base):

    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    title = Column(String(64))
    location = Column(String(64))
    description = Column(Text)
    slug = Column(String(256), unique=True)
    date_start = Column(Date)
    date_end = Column(Date)
    date_created = Column(Date, default=datetime.now())

    gurus = relationship('Guru')

    def __init__(self, *args, **kwargs):
        if 'slug' not in kwargs:
            kwargs['slug'] = slugify(kwargs.get('title', ''))
        super().__init__(*args, **kwargs)


class Guru(Base):

    __tablename__ = 'gurus'

    id = Column(Integer, primary_key=True)
    appeal = Column(String(32), default='')
    first_name = Column(String(64))
    last_name = Column(String(64))
    dignity = Column(String(64), default='')
    image = Column(StdImageField(storage=storage,
                                 variations={
                                     'thumbnail': {"width": 320, "height": 320, "crop": True}}))

    event_id = Column(ForeignKey('events.id'))
    event = relationship('Event')

    def __repr__(self):
        return f"""<Guru id={self.id}> name={self.appeal}
                    {self.first_name} {self.last_name} {self.dignity}>"""
