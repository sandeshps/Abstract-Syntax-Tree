/*
   Program using 'esprima' for checking the non-local variables inside a function. The function is passed as input to
   this code
 */


var esp = require('esprima');

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

function analyzeCode(code) {
    var ast = esp.parse(code); // Parse the code
    traverse(ast,function(node){
        console.log(node.type);
    })
}

var codeFragment = "function test() { var a=10; b=20; }"     ;
analyzeCode(codeFragment);




