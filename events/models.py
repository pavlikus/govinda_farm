import enum
from datetime import datetime

from db import Base

from flask_image_alchemy.fields import StdImageField

from modules import storage

from slugify import slugify

from sqlalchemy import (Column, Date, Enum, ForeignKey,
                        Integer, SmallInteger, String, Text)
from sqlalchemy.orm import relationship


class EventType(enum.Enum):

    weekly = 'yoga weekend'
    long_episodic = 'yoga retreat'


class Event(Base):

    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    title = Column(String(64))
    location = Column(String(64))
    description = Column(Text)
    image = Column(StdImageField(storage=storage,
                                 variations={
                                     'thumbnail': {"width": 640,
                                                   "height": 428,
                                                   "crop": True}}))

    slug = Column(String(256), unique=True)
    date_start = Column(Date)
    date_end = Column(Date)
    date_created = Column(Date, default=datetime.now())

    event_type = Column(Enum(EventType),
                        nullable=False,
                        default=EventType.weekly.name,
                        server_default=EventType.weekly.name)
    gurus = relationship('Guru', back_populates='event')
    banners = relationship('Banner', back_populates='event')

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
                                     'thumbnail': {"width": 320,
                                                   "height": 320,
                                                   "crop": True}}))

    event_id = Column(ForeignKey('events.id'))
    event = relationship('Event', back_populates='gurus')

    def __repr__(self):
        return f"""<Guru id={self.id}> name={self.appeal}
                    {self.first_name} {self.last_name} {self.dignity}>"""


class Banner(Base):

    __tablename__ = 'banners'

    id = Column(Integer, primary_key=True)
    title = Column(String(64))
    image = Column(StdImageField(storage=storage,
                                 variations={
                                     'thumbnail': {"width": 640,
                                                   "height": 428,
                                                   "crop": True}}))

    description = Column(Text)
    sort_order = Column(SmallInteger, default=0)

    event_id = Column(Integer, ForeignKey('events.id'))
    event = relationship('Event', back_populates='banners')
