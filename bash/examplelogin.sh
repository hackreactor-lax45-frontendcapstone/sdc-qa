#!/bin/bash
DIRECTORY='ssh -i "'$PWD'/<pem-key>.pem"'

USER='ubuntu@'

LOGIN1='ec3-6-188-16-59.us-west-1.compute.amazonaws.com'
LOGIN2='<worker-2-location>.us-west-1.compute.amazonaws.com'
LOGIN3='<worker-3-location>.us-west-1.compute.amazonaws.com'
LOGINLOAD='<load-balancer-ec2-location>.us.compute.amazonaws.com'
LOGINDB='<db-location>.us-west-1.compute.amazonaws.com'

if [[ $1 = 1 ]]
then
  eval $DIRECTORY $USER$LOGIN1
elif [[ $1 = 2 ]]
then
  eval $DIRECTORY $USER$LOGIN2
elif [[ $1 = 3 ]]
then
  eval $DIRECTORY $USER$LOGIN3
elif [[ $1 = load ]]
then
  eval $DIRECTORY $USER$LOGINLOAD
elif [[ $1 = db ]]
then
  eval $DIRECTORY $USER$LOGINDB
else
  echo '\nUnknown login entered.\n'
fi