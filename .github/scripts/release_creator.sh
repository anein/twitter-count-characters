#!/bin/bash

if [ -z "$TAG_VERSION" ]; then
  echo ::error::"Variable TAG_VERSION is empty"
  exit 1
fi

# Prepare the headers
AUTH_HEADER="Authorization: token ${GITHUB_TOKEN}"
CONTENT_TYPE_HEADER="Content-Type: application/json"

# set URLs
RELEASE_URL="https://api.github.com/repos/${GITHUB_REPOSITORY}/releases"
echo "${RELEASE_URL}"
# create a release tag
echo ::warning::" 🎉 Create a release."

response=$(
  curl -d @<(
    cat <<EOF
            {
              "tag_name": "${TAG_VERSION}",
              "name": "${TAG_VERSION}",
            }
EOF
  ) \
    -w '%{http_code}\n' \
    -s \
    -sSL \
    -X POST \
    -H "${AUTH_HEADER}" \
    -H "${CONTENT_TYPE_HEADER}" \
    "${RELEASE_URL}"
)

echo "${response}"

status="${response##*$'\n'}"
body="${response%$status}"

if [ "$status" -ge 400 ]; then
  message="$(echo "${body}" | jq '.message')"
  echo ::error::"${message}"
  exit 1
fi

echo ::set-env name=RELEASE_ID::"$(echo "${body}" | jq '.id')"
echo ::warning::" ✔ The release was successfuly created. ${TAG_VERSION}"
