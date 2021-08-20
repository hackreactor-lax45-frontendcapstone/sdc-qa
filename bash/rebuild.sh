#!/bin/bash

DIRECTORY='/Users/lawlorseanr/hackreactor/senior/sdc-qa'
USER='lawlorseanr'
VERSION='latest'

RUN=false
if [[ $1 = 'qanda' ]]
then
  IMAGE='qanda-service'
  DOCKERFILE='Dockerfile.api'
  RUN=true
elif [[ $1 = 'db' ]]
then
  IMAGE='postgres-db'
  DOCKERFILE='Dockerfile.db-init'
  RUN=true
fi

BUILD='docker build -f '$DIRECTORY'/Docker/'$DOCKERFILE' -t '$USER'/'$IMAGE':'$VERSION' . && '
PUSH='docker push '$USER'/'$IMAGE':'$VERSION''

if [[ $RUN = true ]]
then
  eval $BUILD$PUSH
else
  echo '\nUnknown image entered.\n'
fi