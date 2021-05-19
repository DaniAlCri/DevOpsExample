//F1 > Mocha run all tests

//import AddScript from '../AddScript.js';

const assert = require('assert');
const AddScript = require ('../AddScript.js');

var result = 5;

//https://alisdair.mcdiarmid.org/simple-nodejs-tests-with-assert-and-mocha/

describe('Testing AddScript.js', function(){

  it('True == True, Unit test checking', function() {
    assert.strictEqual(1,1, "There is a problem in the Unit test")
  })

 /* it('Add exist', function () {
    //expect(algorithm).to.be.a('function');

  }); */

  it('Normal case', function() {
    //var result = AddScript.add(2,3);
    //assert.strictEqual(result, 5)
    AddScript.add(1,1).should.equal(2);
    //assert.strictEqual(add(2,3), 5);
  })

  /*it('One negative number case', function(){
    assert.strictEqual(test.value(add(-7,3), -4));
    //result == test.value(add(-7,3)).isEqual(-4);
  });

  /*it('Negative numbers case', function(){
    assert.strictEqual(test.value(add(-7,-3), -10));
    //result == test.value(add(-7,-3)).isEqual(-10);
  });

  it('Big numbers case', function(){
    assert.strictEqual(test.value(add(1000000,1000000000), 1001000000));
    //result == test.value(add(1000000,1000000000)).isEqual(1001000000);
  });

  it('No numbers case', function(){
    assert.strictEqual(typeof test.value("a","b"), "String")
    //result == test.value(add("a","b")).isEqual(1001000000);
  });*/
})