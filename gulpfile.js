// Linted using Standard.js

// Requires
var gulp = require('gulp')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var prefix = require('gulp-autoprefixer')
var cp = require('child_process')
var rename = require('gulp-rename')

// Message to print for BrowserSync
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

// Function for building the Jekyll site
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild)
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done)
})

// Rebuild function for calling a reload after rebuilding jekyll
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload()
})

// Launch BrowserSync after jekyll build
gulp.task('browser-sync', ['sass', 'jekyll-build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    }
  })
})

// Compile Sass to both _site and css folders
gulp.task('sass', function () {
  return gulp.src('_sass/main.scss')
      .pipe(sass({
        includePaths: ['scss'],
        outputStyle: 'compressed',
        onError: browserSync.notify
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('_site/'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(gulp.dest('./'))
})

// Watch function for live refresh
gulp.task('watch', function () {
  gulp.watch('_sass/*.scss', ['sass'])
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*', '*.js'], ['jekyll-rebuild'])
})

gulp.task('default', ['browser-sync', 'watch'])
