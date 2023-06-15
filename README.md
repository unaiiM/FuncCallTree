# FuncCallTree
Sample and incomplete library to extract function calls from another function recursively. That means we need to pass a first function where the program will start finding the function calls and then recursively search function calls in the founded function calls. Finally making a functions struct of founded function with the function info and calls founded in it.

```
const fname : string = "hello";
const code : string = fs.readFileSync("./code.js").toString();
const tree : Tree = new Tree(code, fname);
const functions : FuncStore = tree.build();
```

Then with other library we can make a diagram with the generated json. We can make a web interactive diagram or the same library has some methods that allows to get information of the generated json with specific format.

```
const diagram : Diagram = new Diagram(tree.build(), fname);
diagram.generate("./"); // pass the path where the web diagram will be created
```