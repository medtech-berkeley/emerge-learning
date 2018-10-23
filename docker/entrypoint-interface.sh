#!/bin/sh
dockerize -wait tcp://database:5432
# dockerize -wait tcp://redis:6379

python manage.py migrate
python manage.py collectstatic --noinput
exec python manage.py runserver 0.0.0.0:8000
