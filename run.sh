#! /bin/bash

docker-compose -f docker-compose.yml -f local-compose.yml $@

