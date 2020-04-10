//Prototype is a property of functions and it is an object
function foo(a,b){return a*b;}
console.log(foo.constructor);//When you create a function, it's constructor is Function()...so all objects have a constructor.
console.log(foo.prototype); //when you create a function, it is automatically assigned a prototype of {}. 


//constructor gadget
function Gadget(name, color){
    this.name=name;
    this.color=color;
    this.whatAreYou = function(){
        return 'I am a ' + this.color + ' ' + this.name;
    }
}
//to save time, we can add properties and methods to the function's prototype
Gadget.prototype.price = 100;
Gadget.prototype.rating = 3;
Gadget.prototype.getInfo = function(){
    return "Rating: " + this.rating + ', price: ' + this.price;
}

//You can also overwrite the prototype completely
Gadget.prototype = {
    price: 100,
    rating: 3,
    getInfo: function(){
        return "Rating: " + this.rating + ', price: ' + this.price;
    }
};

//All methods and properties added to the prototype of a function are directly available as 
//soon as you create a new object using that constructor function
var newtoy = new Gadget('toy','red');
console.log(newtoy.whatAreYou());

//Prototypes are live, thus children will inherit prototype changes as soon as change was made.
Gadget.prototype.get = function(what){
    return this[what];
}

//in classical coding, you don't expect newtoy to have the get function. But lo and behold:
console.log(newtoy.get('price'));


//Own properties vs prototype properties
//getInfo could've used Gadget.prototype instead of this to achieve same result
Gadget.prototype.getInfo = function(){
    //return "Rating: " + this.rating + ', price: ' + this.price;
    return "Rating: " + Gadget.prototype.rating + ', price: ' + Gadget.prototype.price;
}
//but this goes against prototype chain


//NOTE: an object created from Object.create() will have a constructor function of Object()...can't really do object2.constructor.prototype since its the generic prototype of object.

//How prototype chain works
//To find newtoy.rating, check the newtoy object. If there is no rating in the newtoy object, then 
//engine will identify the prototype of the constructor used to create this function
//(newtoy.constructor.prototype) and check there...continues until you reach Object() object.

//own property takes precedence over inherited prototype porperty
function Gadget2(name){
    this.name=name;
}
Gadget2.prototype.name = 'foo';
var toy = new Gadget2('camera');
console.log(toy.name);
delete toy.name;
console.log(toy.name);
console.log('-------------');

//enumerable properties show up in for-in loops, can check with propertyIsEnumerable(). 
//prototype properties will show up (provided they are enumerable). Can filter with hasOwnProperty();
//SINCE propertyISEnumerable is a refinement of hasOwnProperty, propisenum will return false for prototype properties.

function Gadget3(name,color){
    this.name=name;
    this.color=color;
    this.someMethod = function(){return 1;}
}
Gadget3.prototype.price = 100;
Gadget3.prototype.rating = 3;

var newtoy = new Gadget3('webcam','black');
for(var property in newtoy){
    console.log(property + ' = ' + newtoy[property]);
}

console.log('-------------');

for(var property in newtoy){
    if(newtoy.hasOwnProperty(property)){
        console.log(property + ' = ' + newtoy[property]);
    }
}

//isPrototypeOf() method - tells you whether an object is used as a prototype of another object
var monkey = {
    hair: true,
    feeds: 'bananas',
    breathes: 'air'
};

function Human(name){
    this.name=name;
}
Human.prototype=monkey;
var george = new Human('George');
console.log(monkey.isPrototypeOf(george));

//FROM ANOTHER BOOK, LHS instanceof RHS, RHS should be a function. LHS should probably be an object
//to evalute LHS instanceof RHS, JS evalutes RHS.prototype and thenns look for that value in the prototype chain of LHS.
//NOTE: instanceof will not work if you made all objects with Object.create(). Then you need Object.isPrototypeOf().
//FROM MDN:

function C(){}
function D(){}
let o = new C();
console.log(o instanceof C) //true since Object.getPRototypeOf(o) == C.prototype. 
//In terms of the algorithm. Eval C.prototype. Then Check o's chain: (o.constructor.prototype = c.prototype) == c.prototype
console.log(o instanceof D) //false, since (o.constructor.prototype = c.prototype) !== d.prototype. Going up the chain will not help.

o instanceof Object //true because
C.prototype instanceof Object // true (transitive)

C.prototype = {};
let o2 = new C();
o2 instanceof C // true
console.log(o instanceof C);//false, c.prototype is no longer in o's prototype chain now. 



//secret proto link - good to understand, bad to modify
var monkey2 = {
    feeds:'banana',
    breathes: 'air'
};
function Human2(){};
Human2.prototype = monkey2;
var developer = new Human2();
developer.feeds='pizza';
developer.hacks='Javascript';
console.log(developer.breathes);
//object.constructor.prototype is not good because object.constructor can be easily overwritten.
developer.constructor = 'junk';
console.log(developer.constructor.prototype); //undefined
console.log(developer.breathes); //shows though that somehow we can access the prototype. Thanks to __proto__
console.log(developer.__proto__);

//Augmenting built in objects
//XXXX.prototype.METHOD

//Prototype Gotcha's
//1) PRototype chain is live except when you completely replace it 2.) prototype.constructor is unreliable.

function Dog(){
    this.tail = true;
}
var benji = new Dog();
var rusty = new Dog();
Dog.prototype.say = function(){return 'Woof';}
console.log(benji.say(),rusty.say());
console.log(benji.constructor,rusty.constructor);
//the constructor of the prototype is Dog for some odd reason, it should be Object
console.log(benji.constructor.prototype.constructor);

//We prove that it is not really dog, because:
console.log(benji.constructor.prototype.tail); //undefined

Dog.prototype = {paws:4,hair:true};  //When this occurs, all new Dog types will then be of Constructor Object (and not Dog).

//The old objects do not get access to the new prototype. They have a link to the old object
console.log(benji.paws);
console.log(benji.say());
//However any new objects will have the new prototype
var lucy = new Dog();
console.log(lucy.paws);
//The constructor no longer reports correctly
//So resetting the prototype ruins the constructor and you need to set it up again
console.log(lucy.constructor,benji.constructor);

//prototype of the constructor is really confusing
console.log(lucy.constructor.prototype,benji.constructor.prototype); 
//For the old object, the prototype is the new prototype, but the old object can't access it


//The solution, fix the constructor property of the prototype.
Dog.prototype.constructor  = Dog;