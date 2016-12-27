let Validator = require('../lib/Validator').Validator;
var expect = require('chai').expect;
let errors = require('../lib/BasicErrors').ERRORS; 
let DictionaryLocalizer = require('../lib/DictionaryLocalizer').DictionaryLocalizer; 
let loc = new DictionaryLocalizer(Object.assign({},errors,{
    firstName:"First Name",
    age:"Age"
})); 
let v = new Validator(loc);
v.parseFields([{
    key:'firstName',
    type:'string',
    friendlyName:'First Name',
    rule:'required'
},{
    key:'age',
    type:'number',
    friendlyName:'Age',
    rule:'required|between:18:30'
}]);

describe('test',function(){
    it('should validate',function(){
        expect(v.validate({
            firstName:'Suhail',
            age:25
        }).join('')).to.equal('');
        // assert.equal(-1, [1,2,3].indexOf(4));
    });
})