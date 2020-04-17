/* Chapter 6 Objects
    6.1 Creating Objects
        6.1.1 Object Literals
        6.1.2 Creating Objects with new
        6.1.3 Prototypes
        6.1.4 Object.Create()
    6.2 Querying and Setting Properties
        6.2.1 Objects as Associative Arrays
        6.2.2 Inheritance
        6.2.3 Property Access Errors
    6.3 Deleting Properties
    6.4 Testing Properties
    6.5 Enumerating Properties
    6.6 Property Getters and Setters
    6.7 Property Attributes
        6.7.1 Legacy API for getters and setters
    6.8 Object Attributes
        6.8.1 prototype attribute
        6.8.2 class attribute
        6.8.3 extensible attribute
    6.9 Serializing Ojbects
    6.10 Object Methods
        6.10.1 toString()
        6.10.2 toLocaleString()
        6.10.3 toJSON()
        6.10.4 valueOf()
*/

//Code the book uses:
function inherit(prototype){
    if(prototype == null){
        throw TypeError();
    }
    if(Object.create){
            return Object.create(prototype);
    }
    var t = typeof prototype;
    if(t !== "object" && t !== "function"){
        throw TypeError();
    }
    function f(){};
    f.prototype = prototype;
    return new f();
}
//copy enum of p to o, return o. if o and p have a same name property, o's property is overwritten. does not handle getter, setters, or copy attributes.
function extend(object,prototype){
    for(var property in prototype){
         object[property] = prototype[property];
    }
    return object;
}

Object.defineProperty(Object.prototype, 'extend',
                        {
                            writable:true,
                            enumerable:false,
                            configurable:true,
                            value: function(object){
                                //get all own properties, even nonenum ones
                                var names = Object.getOwnPropertyNames(object);
                                for(var i = 0, N=names.length; i<N;i++){
                                    //skip properties already in this object
                                    if(names[i] in this){
                                        continue;
                                    }else{
                                        //get property description from object
                                        var description = Object.getOwnPropertyDescriptor(object,names[i]);
                                        //use it to create property on this
                                        Object.defineProperty(this,names[i],description);
                                    }
                                }
                            }
                        });


//copy enum of p to, return o. if o and p have same name property, o's property is preserved. does not handle getter, setter, copy attributes
function merge(object,prototype){
    for(var property in prototype){
      /*  if(!object[property]){                            //my code that works ONLY if object is not a decendant of prototype...but thats ridiciousl
            object[property] = prototype[property];         //so my code only works for two, unrelated objects...
        }*/
        if(!object.hasOwnProperty(property)){
            object[property]=prototype[property];
        }
    }
}
//removes properties from o if there is no same name in p
function restrict(object,prototype){
    for(var property in object){
        if(!(propert in prototype)){
            delete object[property];
        }
    }
}
//for each property from p, delete property with same name from o. ∀ property ∈ Prototype...
function subtract(o,p){
    for(var property in prototype){
        delete object[property];
    }
}


//My notes

//Object - unordered collection of poperties (which have a name and value). Since names are strings, this is a hash.

//Common activites to do to object properties: create, set, query, delete, test, enumerate

//Property Attributes: writable, enumerable, configurable

//You can create with: literal, neww, Object.create(), object.prototype()?

//Object.create(null) has an object that will not inherit anything. 
//To make an empty object, use Object.create(Object.prototype);
//The first arg is the prototype, the second argument is the set of property descriptors (enum, config)
"use strict";
var x = Object.create(Object.prototype);
console.log(x);
var y = Object.create(x, {
    'foo': {
        writable: true,
        configurable:true,
        enumerable: true,
        value: 'Hello'
    }
});
console.log(y);

// for/in and object["key"] are a great combo to use

function getValue(portfolio){
    for(stock in portfolio){
        var shares = portfolio[stock];  //here is the combo
        var price = getquote(stock);
        total += shares*price;  
    }
    return total;

    function getquote(stock){
        return stock.price;
    }
}

//NOTES: overriding (dynamic polymorpishm) overloading (static polymorphism). 
//shadowing in prototypes is important. That is, you can inherit variables, then overwrite.
var unitcircle = {r:1};
var c = inherit(unitcircle);
c.x = 1; c.y=1;
c.r=2;
console.log(unitcircle.r); //remains unchanged

//Querying a DNE property will returned undefined. Using methods on DNE will raise a type exception
//use && to guard against this:
var book = {};
var length = book && ("subtitle" in book) && book.subtitle.length;

/* NOTE optional chaining: optional chaining not available in node js.....
const adventurer = {name:'Alice',
                    cat:{
                        name:'Dinah'
                    }
                };

const dogName = adventurer.dog?.name;  
console.log(dogName);*/

/*NOTE null coalescing: not available in nodejs...
const nullValue = null;
const emptyText = ""; // falsy
const someNumber = 42;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC); // 42
*/

//Property assignment fails (that is, setting property p of an object o fails) when:
//1.) o has an own property p that is read-only
//2.) o has inherited property p that is read-only
//3.) o does not have property p. 
//4.) o does not inherit p with a setter method, and o's extensible nature is false. 
//The logic for 4: if p doesn't exist on o, and if there is no setter method, then p must be added. but o not extnesible.

//can't delete inherited properties from  object...you need to go to the prototype
var x = {a: 1};
var y = inherit(x);
y.b = 2;
console.log(delete y.a,y); //delete returns true when property doesn't exist.
console.log(y.a);

//can't delete nonconfig objects (error in strict, returns false in NS)
var x = Object.create(Object.prototype, 
    {
        'a':{
            writable: true,
            configurable:false,
            enumerable: true,
            value: 'I am not configurable'
        }
    });

console.log(delete x.a);

//To delete properties of the global object, do not put 'delete x'. Put 'delete this.x'
console.log(delete this.x);

//Test membership with hasOwnProperty() and propertyIsEnumerable().
var x = {a: 1};
var y = inherit(x);
y.b = 2;
console.log(y.hasOwnProperty("a"), y.hasOwnProperty("b"));
//propertyIsEnumerable refines hasOWnProperty. REturns true only if own propertya nd enumerable=true
console.log(y.propertyIsEnumerable("b"), y.propertyIsEnumerable("toString"));

//instead of using in, can just use !== to make sure not undefined
var o = {x:1};
console.log(o.x !== undefined);
//in can distinguish between properties that do not exist, and propeties that have been set to undefined (as compared to !== undefined)
var o = {x: undefined};
console.log(o.x !== undefined, o.y !==undefined,"x" in o, "y" in o);
delete o.x;
console.log("x" in o);

//for/in will get methods and properties from the prototype
Object.prototype.billybobInput = "billybobOutput";
Object.prototype.billybobmethodInput = function(){console.log("Hi, I'm billybob.")};
var x = Object.create(Object.prototype);
x.notbillybobInput = "notbillybobOutput";
for(var p in x){
    console.log(p);
}
console.log("---------------");
//to filter against prototype properties/methods, do the following
for(var p in x){
    if(x.hasOwnProperty(p)){
        console.log(p);
    }
}
console.log("---------------");
//to filter against prototype methods, but not properties...
for(var p in x){
    if(typeof x[p] !== "function"){
        console.log(p);
    }
}
console.log("---------------");

//Object.keys() returns array of names of enumerable own properties of an object. 
console.log(Object.keys(x));

//Object.getOwnPropertyNames() returns names of all own properites, not just enumerable
console.log(Object.getOwnPropertyNames(x));

//we have accessor properties (get/set) and data properties.
//accessor properties do not get writable (they have set). Depending on combo of get/set, can be read only, write only, read and writable
//The attributes data property have: value, writable, enumerable, configurable
//The attributes accessor properties have: get, set, enumerable, configurable (get=value, set=writable, but are functions not boolean) 

//next demos demonstrate object literals and accessor properties
var p = {
    x:1.0,
    y:1.0,
    //r is a read-write accessor porperty. 
    get r(){return Math.sqrt(this.x*this.x + this.y*this.y);},
    set r(newValue){
        var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
        var ratio = newValue/oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta(){
        return Math.atan2(this.y,this.x);
    }
}
//simpler syntax, p.r vs p.r(); to use set, just do p.r=1 and the code will run.
console.log(p.x, p.r,p.theta, p.r=1,p.x);

//accessor properties are inherited.
var q = inherit(p);
console.log(q);
//q.x = 1, q.y=1;    //if you comment this out, then it'll go to prototype's x and y.
console.log(q.x, q.r,q.theta,q.r=1,q.x);

var serialnum = {
    n:0,
    get next(){return this.n++;},
    set next(value){
        if(value > this.n){
            this.n = value;
        }else{
            throw "Serial number can only be set to a larger value";
        }
    }
}

//now to add accessor properties to existing objects

//propert descriptor - object that represents the set of four attributes
console.log(Object.getOwnPropertyDescriptor({x:1},"x")); //first arg is the object, 2nd arg is the property we are looking at
//this only works for own properties, to query attributes of inherited properties, you must explicity tarverse prototype chain (Object.getPrototypeOf());
var obj1 = {x:1};
var obj2 = inherit(obj1);
obj2.y=1;
console.log(Object.getOwnPropertyDescriptor(obj2,"y"),Object.getOwnPropertyDescriptor(obj2,"x"));
console.log(Object.getPrototypeOf(obj2));

//we define property descriptors iwth Object.defineProperty(), passing obj to be modified, and name of porperty, and object descriptor
var o = {};
Object.defineProperty(o,"x",{
    value:1,
    writable:true,
    enumerable:false,
    configurable:true
});
console.log(o);

//if you create new property and don't name the attributes, most default to false.
//if you modify existing property and don't name attributes, they will be left alone
//WILL NOT ALTER INHERITED PROPERTY
var o = {};
Object.defineProperty(o,"x",{
    value:1,
    writable:true
    //enumerable and configurable should default to false
});
console.log(Object.getOwnPropertyDescriptor(o,"x")); //and they did.

//to modify multiple properties, use Object.defineProperties
var p = Object.defineProperties({},{
    x: {value: 1, writiable:true, enumerable: true, configurable: true},
    y: {value: 1, writiable:true, enumerable: true, configurable: true},
    r:{
        get: function(){ return Math.sqrt(this.x*this.x + this.y*this.y)},
        enumerable:true,
        configurable:true
    }
});
console.log(p);


// RULES FOR WHEN define property WILL THROW AN ERROR:
//1) If an object is not extensible, you can edit existing own properties, but cannot add new properties to it.
var objPE ={x:1};
Object.preventExtensions(objPE);
Object.defineProperty(objPE,"x",{
    value: "I can change this"
});
//Object.defineProperty(objPE,"y",{
//    value: "this will fail"          //commented code since it'll throw type error
//});
console.log(objPE);

//2) IF a property is not configurable, you cannot change it's configurable or enumerable attributes
//3)if an accessor property is not configurable, you cannot change its getter or setter method, cannot change it to a data property
//4) if a data property is not config, you cannot change it to an accessor property
//5) If a data property is not configurable, you cannot change its writable object from false to true, but you can change it from true to false
var obj = {x:1,y:1};
Object.defineProperties(obj,{
                        x: {configurable:false, writable:false },
                        y: {configurable:false, writable:true }
});

//Object.defineProperty(obj, "x", {writable:true});   //commented code since it'll throw a type error
Object.defineProperty(obj,"y", {writable:false});
console.log(Object.getOwnPropertyDescriptor(obj,"y"));

//6.)if a data property is not configurable and not writable, you cannot change it value. You can change the value of a proeprty that is configurable
//you can change the value of a property that is configurable but non writable though (make it writable, change value, convert back to nonwritable)
// END OF RULES FOR WHEN define property WILL THROW AN ERROR-----


//Legacy API for set and get
//__lookupGetter__(), __defineGetter__(), same with setter, etc.

//Object Attributes
//Every object has a prototype, class, and extensible attributes. (NOTE THIS IS BEFORE ES6 classes)


//1.) prototypes
//object literal prototypes are Object.prototype, with new the prototype is the 
//VALUE OF THE PROTOTYPE PROPERTY OF THE CONSTRUCTOR FUNCTION (obj.constructor.prototype)
//Object.create(), the first arguement is the prototype (which may be null).
//You can query with Object.getPrototype() [ES5 but not in ES3]
console.log(Object.getPrototypeOf(obj));
//In ES3, you can try to find it with target_object.constructor.prototype
console.log(obj.constructor.prototype);     
            
                                            //Note from another book, when an object is created, a constructor property(a function) is created. 
                                            //a prototype (object) is property of functions that is createad as soon as we define a function
//...

//isprototypeof will check if the object exists in another object's prototype chain
function myConstructor(){
    this.name="bob"
    this.age=24;
}

myConstructor.prototype.myAge = function(){
    console.log(this.age);
}

var p = new myConstructor();
console.log(p);
p.myAge();

console.log(p.isPrototypeOf(myConstructor));

//prototypeof vs instanceof
//object instanceof function, object prototype chain is checked against function.prototype, not function itself


//2.) class attribute
//This is before ES6. To get class data, you need to use Object.toString() and get the last words
function classOf(o){
    if(o === null){
        return "Null";
    }
    if(o === undefined){
        return "Undefined";
    }
    return Object.prototype.toString.call(o).slice(8,-1);
}

//The above will print out a class. 
//A clever way I've seen it performed is as follows (true false)
function isArray(arr){
    flag = false;
    if(Object.prototype.toString.call(arr).includes("Array")){
        flag = true;
    }
    return flag;
}
console.log(Object.prototype.toString.call([1,2,3]));

//Any object created with Object.create(), {object literal}, or a constructed object with "new" will have a class of Object


//3.) Extensible Attribute
//Whether new properties can be added to an object or not. 

//checks whether it is or isn't extensible
Object.isExtensible(x);

//Prevents extensions (not undoable) of own properties. You can add properties to prototypesmo
Object.preventExtensions(x);

//Stronger than preventExtneisions, Object.seal() makes properties nonconfigurable. This action is undoable.
//However existing properties that are writable can still be set.
Object.seal(x);
Object.isSealed(x);

//Finally, the strongest is freeze. It locks down objects more tightly. Non extensible, nonconfigurable, and read-only
//However if there are accessor properties with set, it ican still be used.
Object.freeze(x);
Object.isFrozen(x);

//AGAIN, these only affect main object. You need to modify prototype as well to stop it.

//You can nest them
var o = Object.seasl(Object.create(Object.freeze({x:1}),{y: {value:2,writable:true}));


//Serializations - JSON

//Objects, arrays, strings, finite numbers, true, false, and null are supported.
//NaN, Inf, -Inf are set to null.
//functions are not supported for JSON.stringify() or JSON.parse

//JSON.stringify only affects enumerables

//Object methods - toString(), toLocaleString(), toJSON()  [this is what stringify looks for],  valueOf()