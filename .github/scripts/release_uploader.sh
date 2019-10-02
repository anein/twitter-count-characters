#!/bin/bash

if [ -z "$RELEASE_ID" ]; then
  echo ::error::"Variable RELEASE_ID is empty"
  exit 1
fi

FILENAME=twitter_counter.$TAG_VERSION.zip

# Check if the release file exists
if [ ! -f "$FILENAME" ]; then
  echo ::error::"File $FILENAME doesn't exist"
  exit 1
fi

# Prepare the headers
AUTH_HEADER="Authorization: token ${GITHUB_TOKEN}"
CONTENT_LENGTH_HEADER="Content-Length: $(stat -c%s "./$FILENAME")"
CONTENT_TYPE_HEADER="Content-Type: application/zip"

# Upload the file
echo ::warning::" 🗄️ Upload the release file."

UPLOAD_URL="https://uploads.github.com/repos/${GITHUB_REPOSITORY}/releases/${RELEASE_ID}/assets?name=${FILENAME}"

response=$(
  curl -w '\n%{http_code}\n' \
    -s \
    -sSL \
    -X POST \
    -H "${AUTH_HEADER}" \
    -H "${CONTENT_LENGTH_HEADER}" \
    -H "${CONTENT_TYPE_HEADER}" \
    --data-binary @"${FILENAME}" \
    "${UPLOAD_URL}"
)

status="${response##*$'\n'}"
body="${response%$status}"

if [ "$status" -ge 400 ]; then
  message="$(echo "${body}" | jq '.message')"
  echo ::error::"${message}"
  exit 1
fi

echo ::warning::" ✔️The release file was successfuly uploaded. ${TAG_VERSION}"
