/* Program init */

import * as fs from "fs";
import Tree, {FuncsStore} from "./lib/tree.js";
import Diagram from "./lib/diagram.js";

const fname : string = "hello";
const code : string = fs.readFileSync("example/index.js").toString();
const tree : Tree = new Tree(code, fname);
console.log(tree.build());
/*const diagram : Diagram = new Diagram(<FuncsStore> tree.build(), fname);
diagram.generate("./");*/