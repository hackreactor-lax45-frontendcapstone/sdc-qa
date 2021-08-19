docker pull lawlorseanr/qanda-service &&
docker stop qanda-service &&
docker rm qanda-service &&
docker run -dp 3000:3000 --name=qanda-service lawlorseanr/qanda-service:latest &&
docker ps -a
