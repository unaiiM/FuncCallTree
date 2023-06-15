import * as fs from "fs";
import Tree from "./../lib/tree.js";
import Diagram from "./../lib/diagram.js";

const fname : string = "hello";
const code : string = fs.readFileSync("example/index.js").toString();
const tree : Tree = new Tree(code, fname);
const diagram : Diagram = new Diagram(tree.build(), fname);
diagram.generate("./");