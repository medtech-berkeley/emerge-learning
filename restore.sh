#!/bin/bash

folder=$(realpath $1)

mkdir -p $folder

gzip -dc $folder/db_data.gz | docker exec -i stanford_database_1 psql -U postgres

docker run --rm --volumes-from stanford-nginx -v $folder:/backup ubuntu tar -C / -xvf /backup/media.tar

docker run --rm --volumes-from stanford-nginx -v $folder:/backup ubuntu tar -C / -xvf /backup/static.tar

