'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({lazy:false}),
    es = require('event-stream'),
    del = require('del'),
    appSrcDir = './app/',
    appBuildDir = './public/';

// gulp.task('test', ['scripts'], function () {
//     return gulp.src('not-found.js')
//     .pipe(plugins.karma({
//         configFile: 'karma.conf.js',
//         action: 'run'
//     }))
//     .on('error', function (err) {
//         throw err;
//     });
// });

gulp.task('css', ['vendorCSS'], function () {
    return gulp.src(appSrcDir + 'app.less')
        .pipe(plugins.less())
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest(appBuildDir + 'css/'));
});

gulp.task('vendorCSS', ['vendorFonts'], function () {
    //concatenate vendor CSS files
    return gulp.src(['./bower_components/angular-material/angular-material.css'])
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest(appBuildDir + 'css/'));
});

gulp.task('vendorFonts', ['clean:css'], function () {
    return gulp.src(['./bower_components/**/*.{ttf,woff,eof,svg}'])
        .pipe(plugins.flatten())
        .pipe(gulp.dest(appBuildDir + 'fonts/'));
});

gulp.task('fonts', function () {

});

gulp.task('copy-index', ['clean:js'], function () {
    return gulp.src(appSrcDir + 'index.html')
        .pipe(gulp.dest(appBuildDir));
});

gulp.task('scripts', ['copy-index'], function () {

    var libSrc = [
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-aria/angular-aria.js',
        './bower_components/hammerjs/hammer.js',
        './bower_components/angular-material/angular-material.js',
        './bower_components/angular-messages/angular-messages.js',
        './bower_components/satellizer/satellizer.js'
    ];

    if (plugins.util.env.type === 'production') {
        var templateStream = gulp.src([
            '!' + appSrcDir + 'index.html',
            appSrcDir + '**/*.html'])
            .pipe(plugins.angularTemplatecache('templates.js', { standalone: true }))
            .pipe(plugins.uglify())
            .pipe(plugins.rev())
            .pipe(gulp.dest(appBuildDir + 'js/'));
    } else {
        var templateStream = gulp.src([
            '!' + appSrcDir + 'index.html',
            appSrcDir + '**/*.html'])
            .pipe(plugins.angularTemplatecache('templates.js', { standalone: true }))
            .pipe(gulp.dest(appBuildDir + 'js/'));
    }

    var appStream = gulp.src([
        appSrcDir + 'app.js',
        '!' + appSrcDir + '**/*test.js',
        appSrcDir + '**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.util.env.type === 'production' ? plugins.concat('app.js') : plugins.util.noop())
        .pipe(plugins.util.env.type === 'production' ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.util.env.type === 'production' ? plugins.rev() : plugins.util.noop())
        .pipe(gulp.dest(appBuildDir + 'js/'));

    var vendorStream = gulp.src(libSrc)
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.util.env.type === 'production' ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.util.env.type === 'production' ? plugins.rev() : plugins.util.noop())
        .pipe(gulp.dest(appBuildDir + 'js/'));

    return gulp.src(appBuildDir + 'index.html')
        .pipe(plugins.inject(es.merge(vendorStream), { name: 'vendor', relative: true }))
        .pipe(plugins.inject(es.merge(templateStream), { name: 'templates', relative: true }))
        .pipe(plugins.inject(es.merge(appStream), { name: 'app', relative: true }))
        .pipe(gulp.dest(appBuildDir));
});

gulp.task('clean:js', function () {
    return del.sync([
        appBuildDir + 'index.html',
        appBuildDir + 'js/**/*.js'], { force: true }); // forcing delete of files outside cwd
});

gulp.task('clean:css', function () {
    return del.sync([
        appBuildDir + 'css/**/*.css',
        '!' + appBuildDir + 'fonts/index.html',
        appBuildDir + 'fonts/*'
        ], { force: true });
});

gulp.task('clean:images', function () {
    return del.sync([
        '!' + appBuildDir + 'images/app/index.html',
        appBuildDir + 'images/app/*'
        ], { force: true });
});

gulp.task('watch', function() {
    gulp.watch([appSrcDir + '**/*.js', appSrcDir + '**/*.html'], ['scripts']);
    gulp.watch([appSrcDir + '**/*.less', appSrcDir + '**/*.css'], ['css']);
});

gulp.task('connect', function() {
    plugins.express.run({
        file: 'app.js'
    });
    // Restart the server when file changes
    gulp.watch([
        appBuildDir + '**/*.html',
        appBuildDir + '**/*.js',
        appBuildDir + '**/*.css',
        appBuildDir + 'images/**/*'], plugins.express.notify);
    gulp.watch(['app.js', 'controllers/**/*.js', 'modules/**/*.js'], [plugins.express.run]);
});

gulp.task('default', ['scripts', 'css', 'fonts']);
gulp.task('serve', ['connect', 'default', 'watch']);
