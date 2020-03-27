///define a "class" animal with private variables

function Animal(name){

    //private varibles using accessor methods
    this.getName = function(){
        return name;
    }
    //unfortunately I can't set anything.
}

Animal.prototype={
    constructor: Animal,
    bark:function(){console.log("bark I am a " + this.getName());}
}






var lion = new Animal("lion");
lion.bark();
console.log(lion.constructor);
console.log(Animal.prototype);