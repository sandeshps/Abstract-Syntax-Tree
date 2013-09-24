/*
   Program using 'esprima' for checking the non-local variables inside a function. The function is passed as input to
   this code.
 */


var esp = require('esprima');

// Code for visiting each and every node of a function passed
function traverse(node, func) {
    func(node);
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            var child = node[key];
            if (typeof child === 'object' && child !== null) {

                if (Array.isArray(child)) {
                    child.forEach(function(node) {
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func);
                }
            }
        }
    }
}

// Code that checks the function
function analyzeCode(code) {
    var variablesArray=[];
    var ast = esp.parse(code); // Parse the code
    traverse(ast,function(node){
        // If the node type is ExpressionStatement, then it is a variable of gloabal scope(non-local)
        if(node.type == 'ExpressionStatement'){
            console.log(node.nodeName);
        }
     })
}




var codeFragment = "function test() {  a=10;b=20;c=30;var f=20;function inner() { d=20;j=99;} }"; // string variable that holds the function to be passed
analyzeCode(codeFragment); // Pass the input function




