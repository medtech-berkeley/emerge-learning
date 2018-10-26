#!/bin/sh
dockerize -wait tcp://database:5432
# dockerize -wait tcp://redis:6379

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "database" -U "$POSTGRES_NAME" -c '\q'; do
	  >&2 echo "Postgres is unavailable - sleeping"
	    sleep 1
done

python manage.py migrate
python manage.py collectstatic --noinput
exec python manage.py runserver 0.0.0.0:8000
