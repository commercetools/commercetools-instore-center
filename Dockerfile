FROM node:4

MAINTAINER Devgurus, support@devgurus.io

# Install extra libraries and prerequisites
RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y ruby \
    && rm -rf /var/lib/apt/lists/* \
    && gem install sass

WORKDIR /home/mean

RUN npm install -g gulp
RUN npm install -g bower

ADD package.json /home/mean/package.json
RUN npm install

ADD .bowerrc /home/mean/.bowerrc
ADD bower.json /home/mean/bower.json
RUN bower install --config.interactive=false --allow-root

ADD . /home/mean

# Set development environment as default
ENV NODE_ENV production

# Port 3000 for server
EXPOSE 3000
CMD gulp production
