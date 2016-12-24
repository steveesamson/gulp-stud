# gulp-stud
Gulp plugin for stud(A simple templating engine for JavaScript). It helps compile stud template.

## Installation
```cli
  
    npm install gulp-stud --save-dev

 ```   

## Usage

```javascript

    var gulp = require('gulp');
    var prefix = require('./');

    gulp.task('stud', function(){
    gulp.src('./path-to-template-files/**/*.html')
        .pipe(stud())
        .pipe(gulp.dest('./path-to-where-you-want-the-compiled-template-files'));
    });

```

## Test

```cli

    npm test

```    

A gulp default task for `dust` has been created for test in this project. This will generate a 'compiled' folder of the compilations.
