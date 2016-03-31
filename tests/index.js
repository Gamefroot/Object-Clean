var cleaner = require("../");
var Util = require("util");
var should = require('should');

var object = cleaner("level", "test", {
    test: new Buffer(5),
    myObject: "test " + Util.inspect(new Buffer(5)),
    deep: {
        test: new Buffer(5),
        date: new Date(2015, 05, 10),
        updatedAt: new Date(2015, 05, 10).toISOString()
    },
    myFuc: function(){}
});



describe("Should clean objects", function(){

    it("Should remove a buffer", function(){
        object.should.have.property("test");
        object.test.should.equal("Buffer");
    });

    it("Should remove a buffer from within a object", function(){
        object.should.have.property("deep");
        object.deep.test.should.equal("Buffer");
    });

    it("Should remove a buffer from within a string", function(){
        object.should.have.property("myObject");
        object.myObject.should.not.match(/Buffer/gi);
    });

    it("Should remove a Functions", function(){
        object.should.have.property("myFuc");
        object.myFuc.should.equal("Function");
    });

});
