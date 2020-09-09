FROM tiangolo/uwsgi-nginx-flask:python3.7

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY nginx_govinda.conf /etc/nginx/conf.d/

COPY . .

ENV UWSGI_INI uwsgi.ini
#ENV STATIC_PATH /app/static
#ENV STATIC_URL /static

EXPOSE 8080
