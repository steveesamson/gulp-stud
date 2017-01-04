let through = require('through2'),
gutil = require('gulp-util'),
PluginError = gutil.PluginError,
path = require('path'),
stud = require('stud');

// Consts
const PLUGIN_NAME = 'gulp-stud';

module.exports = function() {

  
  //Task runner
  let compileStud = function(file, encoding, callback) {

    //Return if there is no file.
  	if (file.isNull()) {

      return callback(null, file);

    }

    //This plugin doesn't support Streams
    if (file.isStream()) {

        return this.emit("error", new PluginError(
      
            PLUGIN_NAME,  "Streaming not supported"
      
        ));

    }


    var data = file.contents.toString("utf8"),

        //Compute this file's location to apply proper name
        compiledFileName = file.path.replace(file.base, "");

    //Carryout the compilation    
    stud.compile(data, compiledFileName, function (output) {
        
        //Ensure compiled string is returned
        if (output) {
            
            //Change file extension from .* to .js
            file.path = file.path.replace(/\.\w+$/,".js");

            //Replace file content with the compiled output
            file.contents = new Buffer(output);

            //Return the file  
            callback(null, file); 
        }
    });    
  };

  //Return a promise for the compilation
  return through.obj(compileStud);
};