import db
from app import app
from events import models
from datetime import date
from werkzeug.datastructures import FileStorage

db.init_db()

event = models.Event(title="Thailand Vaisnava Festival",
                     location="Govinda Farm, Chiang Mai, Thailand",
                     description="",
                     date_start=date(2020, 11, 15),
                     date_end=date(2020, 11, 30))
db.db_session.add(event)
db.db_session.commit()

with open('media/images/guru/srila-bhakti-sudhir-goswami-maharaj.jpg', 'rb') as f:
    guru = models.Guru(appeal='Srila Bhakti', first_name='Sudhir', last_name='Goswami', dignity='Maharaj')
    guru.image = FileStorage(f)
    guru.event = event
    db.db_session.add(guru)
    db.db_session.commit()
    
with open('media/images/guru/srila-bhakti-pavan-janardan-maharaj.jpg', 'rb') as f:
    guru = models.Guru(appeal='Srila Bhakti', first_name='Pavan', last_name='Janardan', dignity='Maharaj')
    guru.image = FileStorage(f)
    guru.event = event
    db.db_session.add(guru)
    db.db_session.commit()

with open('media/images/guru/srila-bhakti-ranjan-madhusudan-maharaj.jpg', 'rb') as f:
    guru = models.Guru(appeal='Srila Bhakti', first_name='Ranjan', last_name='Madhusudan', dignity='Maharaj')
    guru.image = FileStorage(f)
    guru.event = event
    db.db_session.add(guru)
    db.db_session.commit()
