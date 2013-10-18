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

        var projectPackage = grunt.file.readJSON('package.json');
        var options = this.options({
            user: null,
            apikey: null,
            pkg: {
                repo: null,
                userOrg: null,
                name: null,
                version: null,
                desc: null,
                licenses: null,
                labels: null
            }
        });

        // These don't work when specifying directly inside pkg above
        options.pkg.userOrg = options.pkg.userOrg || options.user;
        options.pkg.name = options.pkg.name || projectPackage.name;
        options.pkg.version = options.pkg.version || projectPackage.version;
        options.pkg.desc = options.pkg.desc || 'Automatically created GruntJS package';
        options.pkg.licenses = options.pkg.licenses || ['MIT'];

        var bintray = new Bintray({
            username: options.user,
            apikey: options.apikey,
            organization: options.pkg.userOrg,
            repository: options.pkg.repo
        });

        function checkAndCreatePackage(name) {
            var deferred = Q.defer();
            bintray.getPackage(name).then(function(res) {
                grunt.log.ok("Package '" + res.data.name + "' already exists.");
                deferred.resolve(true);
            }, function(res) {
                if(res.code === 404) {
                    bintray.createPackage(newPackage).then(function(res) {
                        grunt.log.ok("Successfully created new package '" + res.data.name + "'.");
                        deferred.resolve(true);
                    }, function(error) {
                        deferred.reject(new Error(error));
                    });
                }
            });

            return deferred.promise;
        }

        var newPackage = {
            name: options.pkg.name,
            desc: options.pkg.desc,
            licenses: options.pkg.licenses,
            labels: options.pkg.labels
        };

        function uploadFiles(files) {
            var filesDestination = "https://bintray.com/" + bintray.endpointBase + "/" + options.pkg.name + "/" + options.pkg.version + "/files";
            grunt.log.ok("Deploying files to '" + filesDestination + "'");

            var promises = [];
            files.forEach(function (file) {
                file.src.forEach(function (srcPath) {
                    var remotePath = file.dest.replace(/^\/|\/$/g, '');
                    promises.push(bintray.uploadPackage(options.pkg.name, options.pkg.version, srcPath, remotePath).then(function() {
                        grunt.log.ok("Successfully deployed '" + srcPath + "'");
                    }, function(error) {
                        grunt.log.error("Failed deploying " + srcPath + ": " + error.data);
                        finished(false);
                    }));
                });
            });

            return Q.all(promises);
        }

        var files = this.files;
        checkAndCreatePackage(newPackage.name)
            .then(function() { uploadFiles(files).then(function() { finished() }) })
            .fail(function(err) {
                grunt.log.error(err);
                finished(false);
            })
            .done();
    });
};
