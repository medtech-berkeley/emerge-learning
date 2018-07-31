#!/bin/bash
dockerize -wait tcp://database:5432

python3 manage.py migrate
python3 manage.py jenkins --enable-coverage --no-input
exit 0
