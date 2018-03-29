gulp = require 'gulp'

config =
  root: "/app/project"
  src: ["server", "subrepos"]
  dist: "/app/dist"
  cssBundleName: 'style'

require('./gulp')(gulp, config)
return gulp
