# gulp-only

A simple gulp plugin that will search for describe.only and it.only, and list any files that have them.

## Installation

`npm install gulp-only`

## Usage:

Suggested use it to run it on pre-commit, so you can use .only in development but will prevent you from commiting them.
```javascript
const gulpOnly = require('gulp-only');

const specFiles = [
  'src/**/*.spec.js'
];

gulp.task('only-lint', () => {
  return gulp.src(specFiles)
    .pipe(gulpOnly.default())
    .pipe(gulpOnly.results());
});

gulp.task('pre-commit', ['only-lint']);
```



