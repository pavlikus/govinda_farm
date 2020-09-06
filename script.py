import db
from app import app
from events import models
from datetime import date
from werkzeug.datastructures import FileStorage

db.init_db()

description = """
    <div class="container">
        <div class="row py-5">
            <div class="col-12 my-auto">

                <div class="row mt-sm-3 text-center justify-content-center">
                    <h2>In joyous remembrance of our Divine Masters</h2>
                </div>
                
                <div class="row pt-2 pb-2 justify-content-center">
                    <div class="col-auto wrapper"></div>
                </div>
                
                <div class="row pt-2 pb-5 justify-content-center">
                    <div class="col-8 text-center">
                        <p class="lead text-uppercase sub-title">The devotees of Chiang Mai invite you to come and participate in a Vaisnava Festival at Govinda Farm where we can all happily share the association of one another and participate in kirtan, discussions and seva.</p>
                    </div>
                </div>
                
                <div class="row pt-2 pb-5 justify-content-center">
                    <div class="col-10 text-center">
                        <p>The Thailand Vaisnava Festival will be attended by the honourable presence of Srila Bhakti Sudhir Goswami Maharaj and Srila Bhakti Pavan Janardan Maharaj as well as other senior devotees from around the world, with Srila Bhakti Ranjan Madhusudan Maharaj present for the entire event.</p>

                        <p>Commencing with the grand celebration of Govardhan Puja at the Chiang Mai Gupta Govardhan Temple we will then travel to  Govinda Farm for the 2 week festival. Our daily program will begin with sunrise kirtan over the rice fields, followed by various devotional activities including gentle walks with the devotees to nearby temples, through sweet villages and even waterfalls.</p>
                    </div>
                </div>
                
                <div class="row pt-5 pb-2 justify-content-center">
                    <div class="col-10 text-center">
                        <p>Hosted by Embracing the Infinite</p>
                        <p><a href="https://www.facebook.com/Embracing-the-Infinite-292959011528615/" target="_blank" rel="nooper nofollow">https://www.facebook.com/Embracing-the-Infinite-292959011528615/</a></p>
                    </div>
                </div>
            
            </div>
        </div>
    </div>"""

event = models.Event(title="Thailand Vaisnava Festival",
                     location="Govinda Farm, Chiang Mai, Thailand",
                     event_type='long_episodic',
                     description=description,
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
    
description = """
<p>What we need are good friends and association, then we can proceed happily... and when we want to proceed to our destination, this is when the association of Krishna's devotees will be most helpful. Such association can give relief and nourishment to our mind and soul.</p>

<p>Srila Bhakti Sundar Govinda Dev-Goswami Maharaj</p>"""

with open('media/images/banner/srila-bhakti-sundar-govinda-dev-goswami-maharaj.jpg', 'rb') as f:
    banner = models.Banner()
    banner.title = "Srila Bhakti Sundar Govinda Dev-Goswami Maharaj"
    banner.description = description
    banner.image = FileStorage(f)
    banner.sort_order = 1
    banner.event = event
    db.db_session.add(banner)
    db.db_session.commit()
    
description = """
<p>Accommodation will be a choice of</p>
<ul>
    <li>Shared rooms - 7,500 baht per person per week</li>
    <li>Shared camping - 5,000 baht per person per week</li>
</ul>
<p>Teenagers are most welcome to attend when accompanied by a parent/guardian.</p>

<p>Places are limited to 50-60 and will be allocated on a first come first served basis on registration and payment of 50&#37; deposit.</p>"""

with open('media/images/banner/thailand-vaisnava-festival.jpg', 'rb') as f:
    banner = models.Banner()
    banner.title = "Thailand Vaisnava Festival"
    banner.description = description
    banner.image = FileStorage(f)
    banner.sort_order = 2
    banner.event = event
    db.db_session.add(banner)
    db.db_session.commit()
