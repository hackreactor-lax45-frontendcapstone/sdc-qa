#!/bin/sh

DIRECTORY='/Users/lawlorseanr/hackreactor/senior/sdc-qa'
USER='lawlorseanr'
VERSION='latest'

RUN=false
if [[ $1 = 'qanda' ]]
then
  IMAGE='qanda-service'
  DOCKERFILE='Dockerfile.api'
  CONTEXT='.'
  RUN=true
elif [[ $1 = 'db' ]]
then
  IMAGE='postgres-db'
  DOCKERFILE='Dockerfile.db-init'
  CONTEXT='./database'
  RUN=true
elif [[ $1 = 'nginx' ]]
then
  IMAGE='nginx'
  DOCKERFILE='Dockerfile.nginx'
  CONTEXT='.'
  RUN=true
fi

BUILD='docker build -f '$DIRECTORY'/Docker/'$DOCKERFILE' -t '$USER'/'$IMAGE':'$VERSION' '$CONTEXT' && '
PUSH='docker push '$USER'/'$IMAGE':'$VERSION

if [[ $RUN = true ]]
then
  eval $BUILD$PUSH
else
  echo '\nUnknown image entered.\n'
fi