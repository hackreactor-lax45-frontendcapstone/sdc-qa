#!/bin/bash

USER='lawlorseanr'
IMAGE='qanda-service'
TAG='latest'
PORT_FROM=3000
PORT_TO=3000
NAME='qanda-service'

FULL_SERVICE=$USER'/'$IMAGE:$TAG
PORT_MAP=$PORT_FROM':'$PORT_TO

PULL='docker pull '$FULL_SERVICE
STOP='docker stop '$IMAGE
REMOVE='docker rm '$IMAGE
RUN='docker run -dp '$PORT_MAP' --name='$NAME' '$FULL_SERVICE
STATUS='docker ps -a'

eval $PULL' && '$STOP' && '$REMOVE' && '$RUN' && '$STATUS
