#!/bin/bash
set -euo pipefail
set -x
rimraf dist
tsc
tsc -p tsconfig.esm.json
cat package.json |
  jq 'del(.devDependencies)' |
  jq 'del(.scripts)' |
  tee dist/package.json
