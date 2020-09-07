FROM tiangolo/uwsgi-nginx-flask:python3.7

ENV UWSGI_INI uwsgi.ini
#ENV STATIC_PATH /app/static
#ENV STATIC_URL /static

COPY . /app
ADD nginx.conf /etc/nginx
RUN pip install -r /app/requirements.txt

EXPOSE 80

WORKDIR /app
