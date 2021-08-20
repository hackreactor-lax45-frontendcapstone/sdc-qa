#!/bin/bash

USER='lawlorseanr'
TAG='latest'
OPTIONS='--restart unless-stopped'

RUN=false
if [[ $1 = 'qanda' ]]
then
  IMAGE='qanda-service'
  PORT_MAP='3000:3000'
  NAME='qanda-service'
  FULL_SERVICE=$USER'/'$IMAGE:$TAG
  CMD='docker run -dp '$PORT_MAP' --name '$NAME' '$OPTIONS' '$FULL_SERVICE' && '
  RUN=true
elif [[ $1 = 'db' ]]
then
  IMAGE='postgres-db'
  PORT_MAP='5432:5432'
  NAME='postgres-db'
  DB_NAME='database'
  DB_LOCATION='/var/lib/postgresql/data'
  FULL_SERVICE=$USER'/'$IMAGE:$TAG
  CMD='docker run -dp '$PORT_MAP' --name '$NAME' -v '$DB_NAME':'$DB_LOCATION' '$OPTIONS' '$FULL_SERVICE' && '
  RUN=true
elif [[ $1 = 'nginx' ]]
then
  IMAGE='nginx'
  PORT_MAP='80:80'
  NAME='nginx'
  FULL_SERVICE=$USER'/'$IMAGE:$TAG
  CMD='docker run -dp '$PORT_MAP' --name '$NAME' '$OPTIONS' '$FULL_SERVICE' && '
  RUN=true
fi

if [[ $RUN = true ]]
then
  STATUS='docker ps -a'
  eval $CMD$STATUS
else
  echo '\nUnknown image entered.\n'
fi