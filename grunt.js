module.exports = function(grunt) {
  grunt.initConfig({
    info: '<json:bower.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: [
        'grunt.js',
        'component.json',
        'lib/*.js',
        'test/*.js'
      ]
    },
    concat: {
      dist: {
        src: [
          '<banner>',
          'lib/fidel-modal.js'
        ],
        dest: 'dist/fidel-modal.js'
      }
    },
    min: {
      dist: {
        src: [
          '<banner>', 
          'dist/fidel-modal.js'
        ],
        dest: 'dist/fidel-modal.min.js'
      }
    },
    mocha: {
      all: {
        src: 'test/index.html',
        run: true
      }
    },
    less:{
      modal: {
        files: {
          'dist/fidel-modal.css': 'lib/modal.less'
        }
      }
    },
    watch: {
      js: {
        files: [
          '<config:lint.all>',
          'test/index.html',
          'example/*'
        ],
        tasks: 'script' 
      },
      less: {
        files: [
          'lib/modal.less'
        ],
        tasks: 'less'
      }
    },
    reloadr: {
      test: [
        'dist/*',
        'test/*'
      ]
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-reloadr');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('script', 'lint concat min');
  grunt.registerTask('default', 'script less');
  grunt.registerTask('dev', 'default server reloadr watch');
};
