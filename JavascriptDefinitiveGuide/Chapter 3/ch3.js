/* Ch 3 - Types, Values, and Variables
    3.1 Numbers
        3.1.1 Integer Literals
        3.1.2 Floating-point literals
        3.1.3 Arithmetic
        3.1.4 Binary Floating-Point and Roudning Errors
        3.1.5 Dates and Times
    3.2 Text
        3.2.1 String Literals
        3.2.2 Escape Sequences in String Literals
        3.2.3 Working with STrings
        3.2.4 Pattern Matching
    3.3 Boolean
    3.4 null and undefined
    3.5 Global Object
    3.6 Wrapper Objects
    3.7 Immutable Primitive Values and Mutable Object References
    3.8 Type Conversions
        3.8.1 Conversions and equality
        3.8.2 Explicit Conversions
        3.8.3 Object to Primitive Conversions
    3.9 Variable Declaration
        3.9.1 Repeated and Omitted Declaration
    3.10 Variable Scope
        3.10.1 Function Scope and Hoisting
        3.10.2 Variables as properties
        3.10.3 Scope Chain
*/

//My notes:

//different ways to write floating points
console.log(3.14);
console.log(.314e1);
console.log(314E-2);

//You get NaN if you do the following
console.log(0/0);
console.log(Infinity/Infinity); //could also use Number.POSITIVE_INFINITY
console.log(Math.sqrt(-1));
console.log(Math.pow("I will result in NaN",2));

//to test for NaN, do x !== x
var x = NaN;
console.log("NaN != NaN: ", x!==x); //Note that if we don't seperate the comma, the whole expression becomes boolean.

//Overflow is inf (going above Number.MAX_VALUE), underflow is 0 (going below Number.MIN_VALUE). 
console.log("Max: ",Number.MAX_VALUE," Min: ", Number.MIN_VALUE, " Overflow: ", 2*Number.MAX_VALUE, " Underflow: ", Number.MIN_VALUE/2 );
//We can get -0 by doing a negative underflow.
//However 0 === -0
console.log("0 strictly equals -0: ",0 === -0);
// Use 1/-x === 1/x to detect -0
var x=-Number.MIN_VALUE/2;

//This detects -0. First we discard set of values that are of no use to us.
if(x === 0){
    if(1/x === 1/0){
        console.log("We have detected 0");
    }else{
        console.log("We have detected -0");
    }
}

//Floating point numbers have roudn of errors
var x = 0.3 - 0.2;
var y = 0.2 - 0.1;
console.log("Does x = y?: ", x==y);
//secret is to define an epsilon
var epsilon = 0.001
console.log("Does x = y?: ", (x-y)<epsilon);
//Make sure not to do decimal cents, but integer cents. i.e. Not $1.01, but 101 cents


//•	Strings are sequences of 16 bit values (1 slot for a Unicode char).
// Length of string is actually # of 16bit values it has.
//You can have surrogate pairs that represent 1 char, but has length 2
var x = "\ud835\udc52";
console.log("The char ",x, " has length ",x.length);

//HTML use "", javascript use ''

//undefined != false, however undefined will return false in an if statement
console.log("undefined == false?", undefined == false);

if(undefined){
    console.log("This shouldn't show");
}

//use x+"" to convert to string, +x to convert to number, !!x to convert to boolean
var x = 1;
console.log(typeof (x+""), typeof +x, typeof !!x); //Note you must put parenthesis for the string conversion to work. otherwise, its typeof(x)+""

//The book never talked about parseInt vs Number...but parseInt expects a string and tries to convert it to number.
//MAKE SURE TO SPECIFY RADIX. Parseint and parsefloat ignore leading white text.
console.log("ParseInt examples: ",parseInt("                   1",10), parseInt("a1",10),parseInt("1a",10));

//For precision on numbers, use toFixed, toExponential, toPrecision. Tostring can convert to different base (string). 
var n = 17;
console.log(n.toString(2), " NOTE: The number on the left is a string");
var n = 4.34896
console.log(n.toFixed(4)); // Returns a string.This truncates the value. 
console.log(n.toExponential(4)); //This shows value in exponential form with 4 digits after decimal. 
console.log(n.toPrecision(4)); //  Returns a number. It'll look at 4 digits behind decimal, then return the rounded digit version. 
console.log( "1".padStart(4,"*")); //For fun, showing off padstart.

//MOST IMPORANT PART I THINK - Objects to Primitive Conversion

//object -> boolean, all objects are true, even for new Boolean(false). 

//Before we move on, all objects have two methods. ToString() and valueOf().
//toStrings: objects prints [object Ojbect], arrays prints out values with commas, regex prints out regex code, function prints out the function code, date prints out readable date
//valueOf: each wrapper has a valueOf that will return a primitive. objects, regex, arrays just return the code. Date returns epoch. function returns [function] (similar to objects tostring) 
var x = {a:1};
var y = [1,2,3];
var z = /hello/g;
var a = new Date();
var f = function(){var inside = "this is a function"; return inside;};

console.log("x's toString():", x.toString(), "x's valueOf():", x.valueOf());
console.log("y's toString():", y.toString(), "y's valueOf():", y.valueOf());
console.log("z's toString():", z.toString(), "z's valueOf():", z.valueOf());
console.log("a's toString():", a.toString(), "a's valueOf():", a.valueOf());
console.log("f's toString():", f.toString(), "f's valueOf():", f.valueOf());


//Object -> String steps:
// 1.) If object has toString(), call it. if it returns a primitive value, Javascript converts value to a string. 
var n = new Number(1);
console.log("n's toString():", n.toString());
console.log("Converting n to a string:", n+"", typeof(n+""));
//2.) If an object has noString() method , OR IF THE METHOD DOES NOT RETURN A PRIMITIVE, then JS looks for valueOf() method. If valueOf is primitive, it converts it to a string. 
//Note, most objects have a toString.
//3.) finally, if both fail, JS will throw a type error when you try to convert it to a string.

var counterexample = Object.create(null);   //This does not have a toString method at all, nor a valueOf. This will throw a typeerror when trying to convert to a string.

//Object -> Number
//1.) call ValueOf() for the PRIMITIVE value (if it is not primitive, then go to step 2), then convert the primitive to a number.
//2.) call toString() that returns a primtive value and converts it to a number.
//3.) Else, throw type error

//So trying to convert an array to a number...
var emptyarray = [];
var singleArray = [10];

//Note, since array.valueOf returns an object, it switches to toString(). 
//Then emptyarray.toString() = "", and "" is 0 in numbers
//singearray.toString() = "10", and "10" is 10.
//y.toString() = "1,2,3,4", and that does not convert to a number, so NaN. 

console.log("Empty array's valueOf:", emptyarray.valueOf());
console.log("Converting emptyarray to number:", +emptyarray);
console.log("single array's valueOf:", singleArray.valueOf());
console.log("Converting single to number:", +singleArray);
console.log("y array's valueOf:", y.valueOf());
console.log("Converting y to number:", +y); //Tried converting a string to a number, which resulted in NaN

//When using +, ==, there is a special object-->primitive method

//1) object -> number method if non-date object, else object->string for date.
//2.) NOTE that it does not actually convert to a number or string, but returns the original primitive. 

//When using <,>,<=,>=, uses object-primitve method where 1.) object->number method (but does not convert primitive) then object-string method (but does not convert primtiive)

//Talks more about block scope (none in ES3), hoisitng, and variable scope.

//Remember scope chain is where the variable is located lexically (initialized by "variable resolution"),
// while prototype chain is where the property of an object is located in memory. 