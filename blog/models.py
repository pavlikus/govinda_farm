from datetime import datetime

from db import Base

from flask_image_alchemy.fields import StdImageField

from modules import storage

from slugify import slugify

from sqlalchemy import Column, Date, Integer, String, Text


class Post(Base):

    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(64), unique=True)
    description = Column(Text)
    image = Column(StdImageField(storage=storage,
                                 variations={
                                     'thumbnail': {"width": 320,
                                                   "height": 240,
                                                   "crop": True}}))

    slug = Column(String(256), unique=True)
    date_created = Column(Date, default=datetime.now())

    def __init__(self, *args, **kwargs):
        if 'slug' not in kwargs:
            kwargs['slug'] = slugify(kwargs.get('title', ''))
        super().__init__(*args, **kwargs)
