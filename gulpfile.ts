const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
	return src('app/styles/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(purgecss({ content: ['./**/*.tsx'] }))
		.pipe(dest('app/styles/css'));
}

function watchTask() {
	watch(['app/styles/scss/**/*.scss', './**/*.tsx'], buildStyles);
}

exports.default = series(buildStyles, watchTask);
