/*  Chapter 5 Statements
        5.1 Expression Statements
        5.2 Compound and Empty Statements
        5.3 Declaration Statements
            5.3.1 var
            5.3.2 function
        5.4 Conditionals
            5.4.1 if
            5.4.2 else if
            5.4.3 switch
        5.5 Loops
            5.5.1 while
            5.5.2 do/while
            5.5.3 for
            5.5.4 for/in
                5.5.4.1 Proper enumeration order
        5.6 Jumps
            5.6.1 Labeled statements
            5.6.2 break
            5.6.3 continue
            5.6.4 return
            5.6.5 throw
            5.6.6 try/catch/finally
        5.7 Miscellaneous Statements
            5.7.1 with
            5.7.2 debugger
            5.7.1 "use strict"
        5.8 Summary of Javascript Statements
*/

//My notes

//expressions are EVALUATED. Statements are executed (usually use ;)

//expression statements are expressions that have side effects (such as assignments and function invocations)

//Statement block is making a bunch of statements between {} that then becomes a compound statement (no block scope)
{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(pi) = " + cx);
}

//Empy statement is just ;, Good for initalizing arrays. Make sure to comment that you are using an empty statement.
var a = new Array(10); //10 undefined vals
for(var i=0; i < a.length; a[i++] = 0) /*empty*/ ;    

//Declaration statements are statements that declare new varaibles, define  new functions

//Hoisting: declaration is hosited to the top, the value of var is undefined before the point in the code
//where it was lexically defined.

// The book says: Functions are not allowed to be defined in if, while, or other statements. Placing them in other statements is not portable
// My quick research shows that you can do it, but inconcsistent across implementations. Use function expressions instead [ so it is not portable]
{
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
    var hoisted = "foo" in this;
    console.log(`'foo' name ${hoisted ? "is" : "is not"} hoisted. typeof foo is ${typeof foo}`);
    if (true) { //you can set this to true/false and results are the same
    function foo(){ return 1; }
    }

    // In Chrome: 
    // 'foo' name is hoisted. typeof foo is undefined
    // 
    // In Firefox:
    // 'foo' name is hoisted. typeof foo is undefined
    //
    // In Edge:
    // 'foo' name is not hoisted. typeof foo is undefined
    // 
    // In Safari:
    // 'foo' name is hoisted. typeof foo is function
}

//beware of if-elses. For this reason, always use braces
var i=j=1;
var k=2;
if(i==j)
    if(j==k)
        console.log("i equals k");
else
    console.log("i doesn't equal j");


//in  switch statement, if there is no default (AND NO MATCHING CASE) the code gets skipped. You can place the default case anywhere.
//avoid side effects in switch cases. Switch statemeents less efficient than if/elses
var input = "b";//"a"
switch(input){
   // default:
    //    console.log("No input");
      //  break;
    case "a":
        console.log("There is an a");
        break
}

//do while requires semi colon
var i = 0;
do{
    console.log("Do while loop section");
    i++;
}while(i<2);

//for loops can be used for objects too (linked list)

function Node(element){
    this.element = element;
    this.next = null;
}

function LinkedList(){
    this.head = null;
    this.size=0;
}

LinkedList.prototype.add = function(element){
    var node = new Node(element);
    var current;

    if(this.head == null){
        this.head = node;
    }else{
        current = this.head;
        while(current.next){
            current = current.next;
        }
        current.next = node;
    }
    this.size++;
}

var mylist = new LinkedList();
mylist.add(1);
mylist.add(2);

function tail(list){
    for(;list.next;list=list.next) /*empty*/;             //<----Right here is the for with objects
    return list;
}
console.log(tail(mylist));

//for in loop skips when the object (o or o1 in my examples) is null or undefined. otherwise, primitives are autoboxed.
var o = {x:1,y:2,z:3}
var a  = [], i=0;
for(a[i++] in o) /* empty*/;
console.log(a);

var o1 = {x:1,y:undefined,z:3}
for(newvar in o1){
    console.log(o1[newvar]);
}

//enumerable properties are shown in for-in loops. Later on we can make enums non-enums.
//Generally, JS enumaretes object in order that they were defined (interoperable?)

//Enumeration order becomes implenetation-dependent (non-interoperable) if object:
//1) inheirits enumerable properties, 2.) object has properties that are interger array indices,
// 3.) used delete on property, or 4.) used Object.defineProperty().

//Inheritated porperties are enumerated after all the noninherited "own" properties of an object, but are also enumeartated 
//in the order in which they were defined. If object in herits properties from more than one prototype (more than 1 object in prototype chain)
// then the properties of each prototype object in the chain are enumearted in creatoin order before enumerating the properties of the next object

//[ARMANDO LEARN MORE ABOUT INHERITANCE AND THEN GO AND REWWORK THIS]

//Jumps include: continue, break, return, labellled statements, and thrhows

//Break labels are common in nested loops.
var i = 0;
mainloop: while(i<10)
{
    if(i%2 == 0){
        i++;
        continue mainloop;
    }else{
        console.log(i);
        i++;
    }
}

//Continue works differently for different types of loopsl
//while loop, expression is tested again. Dowhile, condition is tested again. for loop, increment expression is evaluted and test expression is evaluted
//for in loop, the loop starts over with next property name being assigned to the specific variable

//When exception is thrown, compiler looks for an exception handler [usually catch]
//(propogating through scope chain). If none are found, returns an error.
function nonNegative(x){
    try{
        if(x < 0){
            throw new Error("Not Negative");
        }
        console.log(x)
    }
    catch(e){
        console.log("Error caught: " + e);
    }
}
nonNegative(1);
nonNegative(-1);

//IF we left the try block due to return, continue, break, then the finally is executed before we jump to a new destination

//If exceptions occur in try and there is no local catch block, then finally is executed before scope lookups for exception handler to catch

function nonNegative2(x){
    try{
        try{if(x < 0){
            throw new Error("Not Negative");
        }
        console.log(x)}
        finally{
            console.log("This will always show. This will also show before the outer catch");
            //make it based on if statement to not show stuff
        }
    }
    catch(e){
        console.log("outercatch");
    }
}

nonNegative2(1);
nonNegative2(-1);

//return in finally will make method return normally (even if an exception thrown and has not been handled.)

function nonNegative3(x){
    try{
        try{if(x < 0){
            throw new Error("Not Negative");
        }
        console.log(x)}
        finally{
            console.log("This will always show. Outercatch will not show anything.");
            return;
            //make it based on if statement to not show stuff
        }
    }
    catch(e){
        console.log("outercatch");
    }
}

nonNegative3(-1);

//with() only provides shortcuts for reading properties of objects, not for creating new properties. Deprecated, it creates scope
//We could use debugger keywrod to help debug.

//Strict Mode[not strict mode]:
/* 
    with not allowed[allowed]
    all vars must be declared or else reference error occur[no ref err, will be global property]
    functions invoked as functions (rather than method) have this=undefined[this=GLOBAL]
    In call() and apply(), the first argument is "this" [null and undefined are replaced with global object and non-boject values converted to objects]
    assignments to nonwritable properties and attempts to create propertes on non-extensible objects trhow type error[no type error, fails silently]
    eval() code cannot declare variables or define functions in the callers scope [It can do so in NS]
    argument holds static copies [in NS, elements of the array and named function parameters both refer to the same value..dynamic?]
    Syntax error is trhown if delete operator is used incorrecty [No error, returns false], especially on non=configerables
    Syntax error for object litereal to define mulitiple properties by same name
    Syntax error for function paramters to have mulitiple paramters by same name
    octal integer literals are not allowed
    evals and arguments are treated as keywords (can't change value or assign vars their vals)
    argument.caller and arguments.callee throw type error (i'm sure one of them is now deprecated...)
*/