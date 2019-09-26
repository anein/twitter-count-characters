#!/bin/bash

if [ -n "$TAG_VERSION" ]; then
  echo ::error "Variable TAG_VERSION is empty"
  exit
fi

FILENAME=twitter_counter.$TAG_VERSION.zip

# Check if the release file exists
if [ ! -f "$FILENAME" ]; then
  echo ::error "File $FILENAME doesn't exist"
  exist
fi

# Prepare the headers
AUTH_HEADER="Authorization: token ${GITHUB_TOKEN}"
CONTENT_LENGTH_HEADER="Content-Length: $(stat -c%s "./$FILENAME")"
CONTENT_TYPE_HEADER="Content-Type: application/zip"

RELEASE_URL="https://api.github.com/repos/${GITHUB_REPOSITORY}/releases"

UPLOAD_URL="https://uploads.github.com/repos/${GITHUB_REPOSITORY}/releases/${TAG_VERSION}/assets?name=${FILENAME}"

echo "$RELEASE_URL"
#Create release
curl \
  -sSL \
  -XPOST \
  -d "{'tag_version': '$TAG_VERSION', 'name': 'v$TAG_VERSION', 'body': 'Description'}" \
  -H "${AUTH_HEADER}" \
  "${RELEASE_URL}"

# Upload the file
curl \
  -sSL \
  -XPOST \
  -H "${AUTH_HEADER}" \
  -H "${CONTENT_LENGTH_HEADER}" \
  -H "${CONTENT_TYPE_HEADER}" \
  --data-binary @FILENAME \
  "${UPLOAD_URL}"