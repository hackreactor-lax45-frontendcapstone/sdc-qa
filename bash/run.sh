#!/bin/bash

if [[ $1 = qanda ]]
then
  echo docker run -dp 3000:3000 --name=qanda-service lawlorseanr/qanda-service:latest
elif [[ $1 = db ]]
then
  echo docker run -d --name postgres-db -p 5432:5432 -v database:/var/lib/postgresql/data lawlorseanr/postgres-db:latest
elif [[ $1 = load ]]
then
  echo docker run --name nginx-loadbalance -d -p 80:80 lawlorseanr/nginx-loadbalance:latest
else
  echo '\n Unknown image selected.'
fi



