let x = "cba(xba(a(), b), a), c, d()";
let funcs = [];
let regex = /[a-z][a-z|0-9|\.]*\(/gi;
let matches = x.match(regex);

if(matches){

    let z = x;

    matches.forEach((func) => {

        

    });

};

function isThereFuncCall(params){
    if(params.indexOf("(") == -1) return false;
    else return true;
};