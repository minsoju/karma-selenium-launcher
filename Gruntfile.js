var hostInterfaces = require("os").networkInterfaces;

var getHostName = function(interfaces){
  var result = '';
  interfaces = interfaces || [];
  for(var index in interfaces){
    var interface = interfaces[index];
    if(!result){
      result = searchHostFamily.apply(null, interface);
    }
    break;
  }
};

var searchHostFamily = function(){
  var result = '';
  for(var argument of arguments){
    if(argument.internal === false && argument.family === 'IPv4'){
      result = argument.address;
    };
  }
  return result;
}

module.exports = function(grunt) {
  process.env.BASE_PATH = __dirname;

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'examples/karma.conf.js',
        hostname: getHostName(hostInterfaces),
        port: 8000
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
