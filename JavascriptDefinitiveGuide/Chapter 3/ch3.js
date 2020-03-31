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

