#! /bin/bash

set -e

export REPO=ctpinstorecenter/commercetools-instore-center
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "master"; else echo ${TRAVIS_BRANCH/\//-} ; fi`
echo "Building Docker image using tag '${REPO}:${COMMIT}'."
docker build -t $REPO:$COMMIT .
echo "Adding additional tag '${REPO}:${TAG}' to already built Docker image '${REPO}:${COMMIT}'."
docker tag $REPO:$COMMIT $REPO:$TAG
echo "Adding additional tag '${REPO}:travis-${TRAVIS_BUILD_NUMBER}' to already built Docker image '${REPO}:${COMMIT}'."
docker tag $REPO:$COMMIT $REPO:travis-$TRAVIS_BUILD_NUMBER
if [ "$TRAVIS_TAG" ]; then
  docker tag $REPO:$COMMIT $REPO:production;
fi
echo "Pushing Docker images to repository '${REPO}' (all local tags are pushed)."
docker push $REPO
