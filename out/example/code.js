function hello(){
    console.log(sayHello("unai"));
    hello(); // infinite
};

function sayHello(name){
    return "Hello " + name;
};