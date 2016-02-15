'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const PluginError = require('gulp-util').PluginError;
const onlyString = ['describe.only', 'it.only'];
let errors = false;

function containsOnly(fileContents) {
  return onlyString.some(search, fileContents)
}

function search(str) {
  return this.includes(str);
}

export default function gulpOnly() {
  const stream = through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-only', 'Streaming not supported'));
      return;
    }

    const found = containsOnly(file.contents.toString(enc));

    if(found) {
      errors = true;
      return cb(null, file);
    }
    return cb();
  });
  return stream;
};

export function results() {
  const stream = through.obj((file, enc, cb) => {
    gutil.log(gutil.colors.red('.only found in '), file.path);
    return cb();
  });
  stream.on('end', () => {
    if(errors) {
      throw new PluginError(
        'gulp-only', {
					name: 'GulpOnlyError',
					message: 'There are .only in your code'
			},  {showStack: false});
      return;
    }
  });
  return stream;
}
