'use strict';

module.exports = function(grunt) {

    // Define the configuration for all the tasks
    // Load grunt tasks automatically
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-karma');

//    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            js: {
                src: [ 'app/assets/scripts/{,*/}*.js' ]
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true,
                autoWatch: true
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true
            },
            js: {
                tasks: ['jshint:js'],
                files: ['Gruntfile.js', 'app/assets/scripts/{,*/}*.js']
            },
            misc: {
                files: [
                    'app/{,*/}*.html'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                base: 'app',
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            server: {
                options: {
                    open: true
                }
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            build: {
                files: [{
                    expand: true,
                    flatten: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'build',
                    src: [
                        '**/assets/scripts/angular-defineThis.js'
                    ]
                }]
            }
        },
        uglify: {
            build: {
                files: {
                    'build/angular-defineThis.min.js': 'app/assets/scripts/angular-defineThis.js'
                },
                mangle: false
            }
        },
        'gh-pages': {
            options: {
                base: 'app'
            },
            src: ['**']
        }

    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', ['copy:build', 'uglify:build', 'gh-pages']);
};