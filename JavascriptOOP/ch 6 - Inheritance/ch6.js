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
//OBVIOUS NOW. because if you set TwoDShape.prototype to a new Shape, then the constructor of TwoDShape.prototype becomes Shape.
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
function Shape2(){}
Shape2.prototype.name = 'shape';
Shape2.prototype.toString = function(){return this.name;};
function TwoDShape2(){}
TwoDShape2.prototype = new Shape2();
TwoDShape2.prototype.constructor = TwoDShape2;
TwoDShape2.prototype.name = '2D Shape'

function Triangle2(side,height){
    this.side = side;
    this.height = height;
}
Triangle2.prototype = new TwoDShape2();
Triangle2.prototype.constructor = Triangle2;
Triangle2.prototype.name = "Triangle";
Triangle2.prototype.getArea = function(){
    return this.side * this.height/2;
}

var my = new Triangle(5,10);
console.log(my.getArea());

//Inheriting the prototype only (Good idea, leads to problem that will be fixed)
//inherit only the prototype. That is, inheriting Shape.prototype is better than inheriting new Shape(). 
//This is because new Shape will give you own shape properties that are not reusuable. 
//We optimize by not creating a new object for inheritance and have less look ups

function Shape3(){}
Shape3.prototype.name = 'shape';
Shape3.prototype.toString = function(){return this.name;};

function TwoDShape3(){}
TwoDShape3.prototype = Shape3.prototype;
TwoDShape3.prototype.constructor = TwoDShape3;

function Triangle3(){}
Triangle3.prototype = TwoDShape3.prototype;
Triangle3.prototype.constructor = Triangle3;
//This reduces a 4 step process to two steps

//SIDE EFFECT: when a child modifies a prototype, the parent and siblings ge tthe changes
Triangle3.prototype.name = 'Triangle';
console.log(new Shape3().name); //Shape now has a name of triangle....


//Temporary Constructor - new F()