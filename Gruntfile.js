module.exports = function(grunt) {

	var testFiles = ['app.js'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			files: ['Gruntfile.js', '!assets/bower', 'assets/**/*.js', 'tests/spec/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'app.js'
			}
		},

		jasmine_node: {
			options: {
				forceExit: true,
				match: '.',
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec',
				jUnit: {
					report: true,
					savePath : "./build/reports/jasmine/",
					useDotNotation: true,
					consolidate: true
				}
			},
			all: ['tests/spec/']
		},

		docco: {
            doc: {
                src: testFiles,
                options: {
                    output: 'docs/'
                }
            }
        },

        plato: {
            report: {
                options : {
                    jshint : grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'reports': testFiles
                }
            }
        },

		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'jasmine_node']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-plato');

	grunt.registerTask('doc', ['docco', 'plato']);
	grunt.registerTask('test', ['jasmine_node', 'jshint']);
	grunt.registerTask('default', ['nodemon']);
};