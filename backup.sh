#!/bin/bash

date=$(date +\%s)
folder=$(pwd)/backup/$date

mkdir -p $folder

docker exec -t stanford_database_1 pg_dumpall -c -U postgres | gzip > $folder/db_data.gz

docker run --rm --volumes-from stanford-nginx -v $folder:/backup ubuntu tar cvf /backup/media.tar /media_files

docker run --rm --volumes-from stanford-nginx -v $folder:/backup ubuntu tar cvf /backup/static.tar /static

echo $folder

