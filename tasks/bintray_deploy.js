/*
 * grunt-bintray-deploy
 * https://github.com/shayke/grunt-bintray-deploy
 *
 * Copyright (c) 2013 Shay Yaakov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var Bintray = require('bintray');
    var Q = require('q');

    grunt.registerMultiTask('bintrayDeploy', 'Deploy to Bintray', function () {
        var finished = this.async();

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


        var filesDestination = "https://bintray.com/" + bintray.endpointBase + "/" + options.pkgName + "/" + options.pkgVersion + "/files";
        grunt.log.ok("Deploying files to '" + filesDestination + "'");

        var promises = [];
        this.files.forEach(function (file) {
            file.src.forEach(function (srcPath) {
                options.filePath = srcPath;
                options.remotePath = file.dest.replace(/^\/|\/$/g, '');
                var uploadFile = bintray.uploadPackage(options.pkgName, options.pkgVersion, options.filePath, options.remotePath);
                promises.push(uploadFile.then(function () {
                    grunt.log.ok("Successfully deployed '" + srcPath + "'");
                }));
            });
        });

        Q.all(promises).then(function() {
            finished();
        }).fail(function (error) {
            grunt.log.error(error.data);
            finished(false);
        });
    });
};
