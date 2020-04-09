//Different patterns for inheritance. Douglas Crockford helped pave the way for inheritance in JS

//Prototype chaining
function Shape(){
    this.name = 'Shape';
    this.toString = function(){
        return this.name;
    };
}

function TwoDShape(){
    this.name = '2D Shape';
}

function Triangle(side, height){
    this.name='Triangle';
    this.side=side;
    this.height=height;
    this.getArea = function(){
        return this.side * this.height/2;
    };
}

function myBadTriangle(){
    this.name = "Bad Triangle";
}
//Now to do inheritance
TwoDShape.prototype = new Shape();   //you do not inherit shape directly.  You can delete Shape() if you want, it will not affect this.
TwoDShape.prototype.constructor = TwoDShape; //When you reset a prototype, you should fix the prototype's constructor. 
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;

//my test case
myBadTriangle.prototype = new TwoDShape();
//Not resetting the constructor of it's prototype.

var my = new Triangle(5,10);
var bad = new myBadTriangle();
console.log(my.getArea());
console.log(my.toString());
console.log(my.constructor); //will report it correctly since we resetted constructors.
console.log(bad.constructor); //The constructor should have been myBadTriangle, but instead it was the prototype up in the chain.
console.log(my instanceof Shape, my instanceof TwoDShape, my instanceof Triangle, my instanceof Array);
console.log(Shape.prototype.isPrototypeOf(my), TwoDShape.prototype.isPrototypeOf(my), Triangle.prototype.isPrototypeOf(my), Array.prototype.isPrototypeOf(my));

var td = new TwoDShape();
console.log(td.constructor);

var s = new Shape();
console.log(s.constructor);


//Add properties that do not change across instances to the prototype
function Shape(){}
Shape.prototype.name = 'shape';
Shape.prototype.toString = function(){return this.name;};
function twoDShape(){}
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.property.name = '2D Shape'