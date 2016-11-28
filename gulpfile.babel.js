import gulp from 'gulp';
import shell from 'gulp-shell';
import eslint from 'gulp-eslint';
import jasmine from 'gulp-jasmine';
import reporters from 'jasmine-reporters';
import rimraf from 'gulp-rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import assetsMod from './src/config/assets/assets';
import path from 'path';
import merge from 'merge-stream';
import flatten from 'gulp-flatten';

const paths = {
  js: ['./src/**/*.js', './src/*.js'],
  source: 'src',
  destination: './app',
  spec_unit: 'app/spec/unit/**/*.spec.js',
  noJs: ['src/**/*', '!app/core/client/**/*.js',
    'app/modules/**/client/**/*.js',
  ],
  client: '',
};

let assets;
let express;

gulp.task('set-production-node-env', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('set-development-node-env', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('set-test-node-env', () => {
  process.env.NODE_ENV = 'test';
});

gulp.task('clean', () => {
  return gulp.src([paths.destination])
    .pipe(rimraf());
});

gulp.task('babel', shell.task([
  `babel ${paths.source} --out-dir ${paths.destination}`,
]));

gulp.task('run_server', shell.task([
  `node ${path.join(__dirname, paths.destination, 'index.js')}`,
]));

gulp.task('lint', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jasmine', () => {
  return gulp.src(paths.spec_unit)
    .pipe(jasmine({
      reporter: new reporters.TerminalReporter({
        verbosity: 1,
        color: true,
        showStack: true,
      }),
    }));
});

gulp.task('copy-source', () => {
  return gulp.src(paths.noJs, { base: paths.source })
    .pipe(gulp.dest(paths.destination));
});

gulp.task('client', (cb) => {
  run('load-assets', 'views', 'images', 'vendor', 'application', cb);
});

gulp.task('build', (cb) => {
  run('clean', 'copy-source', 'babel', 'client', cb);
});

gulp.task('test', (cb) => {
  run('set-test-node-env', 'build', 'jasmine', cb);
});

gulp.task('load-assets', () => {
  assets = assetsMod(process.env.NODE_ENV);
});

gulp.task('server', () => {
  express = server.new(paths.destination);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () => {
  return watch(paths.source, () => {
    run('build', 'restart');
  });
});

gulp.task('views', () => {
  return gulp.src(assets.client.views)
    .pipe(flatten())
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, 'views')));
});

gulp.task('images', () => {
  return gulp.src(assets.client.images, { cwd: paths.source })
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, 'images')));
});

gulp.task('vendor', () => {
  let fonts;

  const js = gulp.src(assets.client.vendor.js, { base: './public/lib' })
    .pipe(gulpif(process.env.NODE_ENV === 'production', concat('vendor.js')))
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.vendor.dest,
      'js')));

  const css = gulp.src(assets.client.vendor.css, { base: './public/lib' })
    .pipe(gulpif(process.env.NODE_ENV === 'production', concat('vendor.css')))
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.vendor.dest,
      'css')));

  if (process.env.NODE_ENV === 'production') {
    fonts = gulp.src(assets.client.vendor.fonts, { base: './public/lib' })
      .pipe(flatten())
      .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.vendor.dest,
        'fonts')));
  } else {
    fonts = gulp.src(assets.client.vendor.fonts, { base: './public/lib' })
      .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.vendor.dest,
        'css')));
  }


  return merge(js, css, fonts);
});

gulp.task('application', () => {
  const js = gulp.src(assets.client.application.js, { cwd: paths.destination })
    .pipe(gulpif(process.env.NODE_ENV === 'production', concat('application.js')))
    // .pipe(gulpif(process.env.NODE_ENV === 'production', uglify())) // Need to be fixed
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.application.dest,
      'js')));

  const css = gulp.src(assets.client.application.css, { cwd: paths.destination })
    .pipe(gulpif(process.env.NODE_ENV === 'production', concat('application.css')))
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.application.dest,
      'css')));


  const fonts = gulp.src(assets.client.application.fonts, { cwd: paths.destination })
    .pipe(gulp.dest(path.join(paths.destination, assets.client.dest, assets.client.application.dest,
      'fonts')));

  return merge(js, css, fonts);
});

gulp.task('default', (cb) => {
  run('set-development-node-env', 'server', 'build', 'restart', 'watch', cb);
});

gulp.task('production', (cb) => {
  run('set-production-node-env', 'build', 'run_server', cb);
});
