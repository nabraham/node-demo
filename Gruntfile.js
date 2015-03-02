module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
            options: {
                laxcomma: true
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);

};
