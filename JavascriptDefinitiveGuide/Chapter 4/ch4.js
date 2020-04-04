/*
    Chapter 4 Expressions and Operators
        4.1 Primary Expressions
        4.2 Object and Array Initializers
        4.3 Function Definition Expressions
        4.4 Property Access Expressions
        4.5 Invocation Expressions
        4.6 Object Creatoin Expressions
        4.7 Operator Overview
            4.7.1 Number of Operands
            4.7.2 Operand and Result Type
            4.7.3 Lvalues
            4.7.4 Operator Side Effects
            4.7.5 Operator Precendence
            4.7.6 Operator ASsociativy
            4.7.7 Order of Evaluation
        4.8 Arithemtic Expressions
            4.8.1 The + Operator
            4.8.1 Unary Arithmetic Operators
            4.8.1 Bitwise Operators
        4.9 Relational Expressions
            4.9.1 Equality and Inequality Operators
            4.9.2 Comparison Operators
            4.9.2 the In Operator
            4.9.4 The Instanceof Operator
        4.10 Logical Expressions
            4.10.1 Logical AND (&&)
            4.10.2 Logical OR (||)
            4.10.3 Logical NOT (!)
        4.11 Assignment Expressions
            4.11.1 Assignment with Operation
        4.12 Evalution Expressions
            4.12.1 eval()
            4.12.2 Global eval()
            4.12.3 STrict eval()
        4.13 Misclellaneous Operators
            4.13.1 The Conditional Operator (?:)
            4.13.2 The Typeof Operator
            4.13.3 The delete Operator
            4.13.4 The void Operator
            4.13.5 The Comman Operator (,)
*/

//My notes

//Primary expressions are literals, some reserved words (True, false, null, this), and bare variables (i, sum, etc.). 

//Trailing commas in Arrays lead to sparse arrays with undefined values in between. Note that N commas mean N-1 items in between.
var a = [1,,,5];
console.log(a.valueOf(), a[2]);

//functions that expect parameters but aren't given any will be given undefined
function output(op){
    console.log(op);
}
output();

//Association can be left or right. assignment = is right, Memeber access . is left, along with subtraction. 

//Lvalues are variables, properties of objects, or elements of arrays. 

//Operators have side effects which include --,++, and delete. This is where it can be tricky.
//deleting will assign undefined to the property, while --,++ can change calculations

//Note: "1"*,-,/"1" will return a number, "1"+"1" will return 11 due to concat. + priortiize toString(). 
//note 2+null=2, but 2+undefined=NaN
console.log(2+undefined);

var i = 1, j=++i; //i=1, but then increment i, then set j equal to i.
console.log(i,j);

var i=1, j=i++; //i=1, set j equal to i, then increment i.
console.log(i,j);

//Boolean Algebra and bitwise operators are included here....

//x!==x returns true for NaN. null == undefined. 

//Study String.localeCompare()

//"11"<3 is a numeric comparison. "11" converted to 11. Result is false
console.log("11"<3);
//"one"<3 is a numeric comparision. "one" converted to NaN. Result is false
console.log("one"<3);

// "x" in Object, in expects left side to be a string and will try force it to be a string.

//O instanceof F works as follows: If O is not an object, return false. Else, Look at f.prototype and check o's prototype chain. If it finds a match, then o is an instance of f. 

//x&&y will return the first falsy value or the last truthy value(assuming no falsy).
//But x&&y will return y if x is true, else return x...
//I think this is good for checking whether an object exists or not
var o = {};
if(o && o.name){
    console.log(o.name); 
}else{
    console.log("Something went wrong with object o");
}

//x||y will return the first truthy value, or the last falsy value( assuming no truthy)
//usually used for default values 
var x = o.name || "Steven"
console.log(x);

//A op=b does not imply a = a op b when side effects occur
data = [1,1];
data2 = [1,1];

for(var i = 0; i < data.length; i++){
    data[i++] *= 2;
    data2[i++] = data2[i++]*2;
}
console.log(data,data2);

//global function eval() is dynamic evaluation of strings. eval() is a function, but should've been an operator.
//eval() works with the scope that it is in. 
//Global eval(). Assign eval to a variable throws EvalError, because it originally would execute globally. 
//strict eval() can't affect its local scope. can't overwrite eval or name things eval. 

console.log(typeof null,typeof undefined);

//Functions vs Callable objects: all functions are callable, but not all callable objects are functions.
//Typeof returns functions for all native objects that are callable (ES3). ES4 extends this to host and native. 8.7.7 more details.

//delete works on object properties and array elements (sparse arrays)
var o = {name: "bob", age: 24};
delete o.age;
console.log(o);
var a = [1,2,3,4];
delete a[2];
console.log(a);

//void operator is used in JS URLS (uncommon). Mainly used for side effects since it runs everything inside and then returns undefined.
//<a herf="javascript:void window.open();">Open new window </a>
//javascript:URL
//nowadays use event handler.