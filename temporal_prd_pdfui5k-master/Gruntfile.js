'use strict'

module.exports = function(grunt){
	grunt.initConfig({
		dir:{
			webapp: "AutoservicioPHR.App",
			dist: "dist"
		},

		copy:{
			dist:{
				files:[{
					expand: true,
					cwd: "<%= dir.bessoec %>",
					src:[
						"**"
					],
					dest: "<%= dir.dist %>"
				}]
			}
		},

		clean: {
			dist: "<%= dir.dist %>/"
		},

		openui5_preload:{
			component:{
				options:{
					resources:{
						cwd: "src/static/App",
						prefix: "AutoservicioPHR/App",
						src:[
						"**/*.js",
						"**/*.fragment.html",
						"**/*.fragment.json",
						"**/*.fragment.xml",
						"**/*.view.html",
						"**/*.view.json",
						"**/*.view.xml",
						"**/*.properties",
						"manifest.json"
						]
					},
					dest: "dist"
				},
				components: true
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-openui5");

	//build task
	grunt.registerTask("build", ["clean:dist", "openui5_preload", "copy"]);

	//default task
	grunt.registerTask("default", ["clean", "build"]);

};