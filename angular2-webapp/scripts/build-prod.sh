#!/usr/bin/env bash

set -e
npm run clean:build
# Until they are AOT competible...
webpack --config config/webpack/webpack.dev.js --profile --bail
