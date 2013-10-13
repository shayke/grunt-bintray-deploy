/*
 * grunt-bintray-deploy
 * https://github.com/shayke/bintray-deploy
 *
 * Copyright (c) 2013 Shay Yaakov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var Bintray = require('bintray');
    var Q = require('q');

    grunt.registerMultiTask('bintrayDeploy', 'Deploy to Bintray', function () {
        var done = this.async();
        var pkg = grunt.file.readJSON('package.json');
        var options = this.options({
            pkgName: pkg.name,
            pkgVersion: pkg.version
        });

        var bintray = new Bintray({
            username: options.username,
            apikey: options.apikey,
            organization: options.subject,
            repository: options.repo
        });

        var queue = [];
        this.files.forEach(function (file) {
            file.src.forEach(function (srcPath) {
                options.filePath = srcPath;
                options.remotePath = file.dest.replace(/^\/|\/$/g, '');
                queue.push(bintray.uploadPackage(options.pkgName, options.pkgVersion, options.filePath, options.remotePath));
            });
        });

        // TODO: Fix that with proper logging
        Q.all(queue).then(function (ful) {
            // All the results from Q.all are on the argument as an array
            console.log('fulfilled', ful);
        },function (rej) {

            // The first rejected (error thrown) will be here only
            console.log('rejected', rej);
        }).fail(function (err) {

                // If something whent wrong, then we catch it here, usually when there is no
                // rejected callback.
                console.log('fail', err);
            }).fin(function () {

                // Finally statemen; executed no matter of the above results
                console.log('finally');
            });
    });
};
