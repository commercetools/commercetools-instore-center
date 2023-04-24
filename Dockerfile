FROM node:20

MAINTAINER Devgurus, support@devgurus.io

WORKDIR /home/mean

# Install extra libraries and prerequisites
RUN rm -rf /var/lib/apt/lists/* \
    && npm install -g gulp \
    && npm install -g bower

ADD package.json /home/mean/package.json
ADD .bowerrc /home/mean/.bowerrc
ADD bower.json /home/mean/bower.json

RUN npm install \
    && bower install --config.interactive=false --allow-root

ADD . /home/mean

# Port 3000 for server
EXPOSE 3000
CMD gulp
