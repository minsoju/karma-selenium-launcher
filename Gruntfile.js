module.exports = function(grunt) {
  process.env.BASE_PATH = __dirname;

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'examples/karma.conf.js'
      },
      dev: {
        singleRun: false,
        autoWatch: true
      }
    }
  }

  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-karma');
}
