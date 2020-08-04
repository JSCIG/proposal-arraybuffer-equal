#!/bin/bash
set -euo pipefail
set -x

cd dist || exit 1

jq '.name = "@nicelabs/proposal-arraybuffer-equals"' package.json > package-modified.json
mv package-modified.json package.json

VERSION=$(jq -r '.version' package.json)
npm --no-git-tag-version version "$VERSION-$BUILD_VERSION"
npm publish
