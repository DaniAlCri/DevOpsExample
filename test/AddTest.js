//F1  Mocha run all tests
const assert = require('assert');
//var test = require('unit.js');
//var test = require('Add.js');

var result = 5;

//https://howtodoinjava.com/javascript/jasmine-unit-testing-tutorial/

describe('Testing AddScript.js', function(){

    it('Normal case', function(){
      assert.StrictEqual(Add(2,3), 5);
      //result == test.value(add(2,3)).isEqual(5);
    });

    /*it('Negative numbers case', function(){
      assert.equal(test.value(add(-7,3), -4));
      //result == test.value(add(-7,3)).isEqual(-4);
    });

    it('Big numbers case', function(){
      assert.equal(test.value(add(1000000,1000000000), 1001000000));
      //result == test.value(add(1000000,1000000000)).isEqual(1001000000);
    });

    it('No numbers case', function(){
      assert.equal(typeof test.value("a","b"), "String")
      //result == test.value(add("a","b")).isEqual(1001000000);
    });*/
  });