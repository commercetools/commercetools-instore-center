FROM node:4

MAINTAINER Devgurus, support@devgurus.io

WORKDIR /home/app

# Install extra libraries and prerequisites
RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y ruby \
    && rm -rf /var/lib/apt/lists/* \
    && gem install sass \
    && npm install -g gulp \
    && npm install -g bower

# Make everything available for start
ADD . /home/app
RUN npm install

# Set development environment as default
ENV NODE_ENV production

# Port 3000 for server
EXPOSE 3000
CMD gulp production
