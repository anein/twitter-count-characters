#!/bin/bash

if [ -z "$TAG_VERSION" ]; then
  echo ::error::"Variable TAG_VERSION is empty"
  exit
fi

FILENAME=twitter_counter.$TAG_VERSION.zip

# Check if the release file exists
if [ ! -f "$FILENAME" ]; then
  echo ::error::"File $FILENAME doesn't exist"
  exist
fi

# Prepare the headers
AUTH_HEADER="Authorization: token ${GITHUB_TOKEN}"
CONTENT_LENGTH_HEADER="Content-Length: $(stat -c%s "./$FILENAME")"
CONTENT_TYPE_HEADER="Content-Type: application/zip"

# set URLs
RELEASE_URL="https://api.github.com/repos/${GITHUB_REPOSITORY}/releases"
UPLOAD_URL="https://uploads.github.com/repos/${GITHUB_REPOSITORY}/releases/${TAG_VERSION}/assets?name=${FILENAME}"

echo ::warning::"Create release. URL ${RELEASE_URL}"
# create a release tag
response=$(curl   -d @<(
    cat <<EOF
            {
              "tag_name": "${TAG_VERSION}",
              "name": "v${TAG_VERSION}",
              "body": "Description"
            }
EOF
) \
                  -w '%{http_code}\n' \
                  -s \
                  -sSL \
                  -X POST \
                  -H "${AUTH_HEADER}" \
                  -H "Content-Type: application/json" \
                  "${RELEASE_URL}"
              )

status="${response##*$'\n'}"
body="${response%$status}"
message="$(echo "${body}" | jq '.message')"

if [ "$status" -ge 400 ]; then
    echo ::error::"${message}"
    exit
else
    echo ::warning::"Release was successfuly created. ${TAG_VERSION}"
fi

# Upload the file
echo ::warning::"Upload the release file.URL ${UPLOAD_URL}"

response=$(
    curl -d \
        -w '%{http_code}\n' \
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
message="$(echo "${body}" | jq '.message')"

if [ "$status" -ge 400 ]; then
    echo ::error::"${message}"
    exit
else
    echo ::warning::"The release file was successfuly uploaded. ${TAG_VERSION}"
fi

