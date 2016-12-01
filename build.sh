#! /bin/bash

set -e

usage() {
    echo "$(basename $0) - Script to build a Docker image."
}

REGISTRY=ctpinstorecenter
PROJECT='commercetools-instore-center'

docker build -t "${REGISTRY}/${PROJECT}:$(git rev-parse --short HEAD)" .
docker tag -f "${REGISTRY}/${PROJECT}:$(git rev-parse --short HEAD)" "${REGISTRY}/${PROJECT}:latest"
