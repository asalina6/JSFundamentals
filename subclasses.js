//inherit function
function inherit(p){
    if(p == null) throw TypeError();
    if(Object.create){
        return Object.create(p);
    }
    var t = typeof p;
    if(t !== "object" && t!=="function"){
        throw TypeError();
    }
    function f(){};
    f.prototype=p;
    return new f();
}

//Define default values for the animal class. This could go inside of it.
var defaults = {
    name: "Animal",
    color: "Black",
}
///define a "class" animal with private variables
function Animal(options){
    var _name = options.name || defaults.name,
        _color = options.color || defaults.color;

    this.getName = function(){
        return _name;
    }
    this.setName = function(newName){
        _name = newName;
    }
    this.getColor = function(){
        return _color;
    }
    this.setColor = function(newColor){
        _color = newColor;
    }
}

Animal.prototype={
    constructor: Animal,
    bark:function(){console.log("bark I am a " + this.getName());},
    description: function(){console.log("I am a " + this.getColor() + " " + this.getName())}
}

var lionObject = {name:"Lion", color: "Yellow"};

var lion = new Animal(lionObject);
lion.bark();
lion.description();
console.log(lion.constructor);
console.log(Animal.prototype);