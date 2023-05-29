FROM node:20.2.0-buster

RUN apt update -y
RUN apt upgrade -y
RUN apt install git -y

RUN git clone https://github.com/Kruceo/Gato.git /gato
WORKDIR /gato
RUN npm i 

ENTRYPOINT [ "node","index.mjs" ]




