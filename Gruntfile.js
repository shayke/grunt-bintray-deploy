/*
 * grunt-bintray-deploy
 * https://github.com/Shay/bintray-deploy
 *
 * Copyright (c) 2013 Shay Yaakov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        bintrayDeploy: {
            package_creation: {
                options: {
                    user: "username",
                    apikey: "apikey",
                    baseUrl: "http://localhost:8882",
                    pkg: {
                        repo: "repo",
                        name: "new-package",
                        version: "1.1.0"
                    }
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["test/fixtures/test.js"],
                    dest: "1.1.0",
                    filter: "isFile"
                }]
            },
            existing_package: {
                options: {
                    user: "username",
                    apikey: "apikey",
                    baseUrl: "http://localhost:8882",
                    pkg: {
                        repo: "repo",
                        version: "2.2.0"
                    }
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["test/fixtures/dir/test2.txt"],
                    dest: "2.2.0/dir",
                    filter: "isFile"
                }]
            }
        },

        stubby: {
            bintray: {
                files: [{
                    src: [ 'test/mocks/*.json' ]
                }]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-stubby');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'stubby', 'bintrayDeploy', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};