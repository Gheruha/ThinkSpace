const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
	return src('src/styles/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(purgecss({ content: ['src/**/*.tsx'] }))
		.pipe(dest('src/styles/css'));
}

function watchTask() {
	watch(['src/styles/scss/**/*.scss', 'src/**/*.tsx'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
