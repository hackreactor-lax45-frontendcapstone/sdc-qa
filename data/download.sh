#!/bin/bash
#https://stackoverflow.com/questions/48133080/how-to-download-a-google-drive-url-via-curl-or-wget

# photos
fileid="1TbhRZ_sKBAu2Z0-sppE55D051G3MVP9I"
filename="photos.csv"
curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}" > /dev/null
curl -Lb ./cookie "https://drive.google.com/uc?export=download&confirm=`awk '/download/ {print $NF}' ./cookie`&id=${fileid}" -o ${filename}

#answers
fileid="1xVnfJGxq0If2d3rJI1IUWTC1RLigik1l"
filename="answers.csv"
curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}" > /dev/null
curl -Lb ./cookie "https://drive.google.com/uc?export=download&confirm=`awk '/download/ {print $NF}' ./cookie`&id=${fileid}" -o ${filename}

#questions
fileid="1yvXuqx6gT1ugD3vbVh6_tH8xEGx3Cwlb"
filename="questions.csv"
curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}" > /dev/null
curl -Lb ./cookie "https://drive.google.com/uc?export=download&confirm=`awk '/download/ {print $NF}' ./cookie`&id=${fileid}" -o ${filename}