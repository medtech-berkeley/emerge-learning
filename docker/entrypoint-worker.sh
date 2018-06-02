#!/bin/bash
dockerize -wait tcp://database:5432
dockerize -wait tcp://redis:6379

cd /stanford && python manage.py runworker

