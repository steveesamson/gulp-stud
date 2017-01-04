
var expect = require('chai').expect,
File = require('vinyl'),
stud = require('../');

describe('gulp-stud', function() {
    
  describe('in buffer mode', function() {

    it('should compile given html file to stud template javascript', function(done) {

      // create the fake file
      var fakeFile = new File({

        path:"test.html",/*This is necessary; it forms the name of registration*/

        contents: new Buffer("<p>Summary: I am {name}, age {age} and lives at {address}. Thanks.</p>")

      });

      // Create a prefixer plugin stream
      var _stud  = stud();

      // write the fake file to it
      _stud.write(fakeFile);

      // wait for the file to come back out
      _stud.once('data', function(file) {

        // make sure it came out the same way it went in
        // assert(file.isBuffer());
        expect(file.isBuffer()).to.be.equal(true);
        
        var actual = "(function(c){var b = c.buffer();c.register(\"test.html\",function(x){b.append(\"<p>Summary: I am \").append(x['name']).append(\", age \").append(x['age']).append(\" and lives at \").append(x['address']).append(\". Thanks.</p>\"); return b.toString();});}(stud));";
        
        var expected = file.contents.toString('utf8');
        
        // assert actual and expected are equal
        expect(expected).to.be.equal(actual);
        
        
        done();
      });

    });

  });
});