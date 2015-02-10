module.exports = function(grunt) {
	
	// config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		less: {
			build1: {
				src: ['src/style_1.less', 'src/style_2.less'],
				dest: 'build/styles.css' 
				// files: {
				// 	//'build/styles.css' : 'src/style_1.less'
				// 	// 'build/styles.css' : ['src/style_1.less', 'src/style_2.less'] 
				// 	'build/styles.css' : 'src/**/*.less'
				// }
			},

			build2: {
				options: {
					compress: true
				},
				src: 'src/style_2.less',
				dest: 'build/styles2.css' 
			}
		},

		csslint: {
			check: {
				src: '<%= less.build1.dest%>'
			}
		},

		cssmin: {
			minimize: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/'
				},
				files: {
					'build/styles.min.css' : '<%= less.build1.dest%>'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			files: 'src/*.less',
			task: ['less:build1', 'csslint', 'cssmin']
		},

		connect: {
			server: {
				options: {
					port: 8080,
					hostname: '192.168.33.10'
				}
			}
		}

	});

	// plugin
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// tasks
	grunt.registerTask('default', 'less');
	grunt.registerTask('task1', ['less:build1', 'csslint', 'cssmin', 'connect', 'watch']);
	grunt.registerTask('task2', 'less:build2');

}