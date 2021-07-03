//run with "npm test"

const assert = require('assert');
const AddScript = require ('../www/js/AddScript.js');

var result = 5;

describe('Testing AddScript.js', function(){

  it('True == True, Unit test checking', function() {
    assert.strictEqual(1,1, "There is a problem in the Unit test")
  })

  it('Normal case', function() {
    var result = AddScript.add("2 3");
    assert.strictEqual(result, 5)
  })

  it('One negative number case', function() {
    result = AddScript.add("-7 3");
    assert.strictEqual(result, -4)
  });

  it('Negative numbers case', function(){
    result = AddScript.add("-7 -3");
    assert.strictEqual(result, -10)

  });

  it('Big numbers case', function(){
    result = AddScript.add(" 1000000 1000000000  1001000000 ");
    assert.strictEqual(result, 2002000000);
  });

  it('No numbers case', function(){
    result = AddScript.add(" asd e - * ");
    assert.strictEqual(result, 0);
  });

  it('Mixed numbers and characters case', function() {
    result = AddScript.add("5 g--s ad asd -r - 12 -4 @3~# asd");
    assert.strictEqual(result, 13);
  });
})