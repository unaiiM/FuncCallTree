import Tree, { FuncsStore, FuncTree, FuncObj } from "./tree.js";
import * as fs from 'fs';
import * as ejs from 'ejs';

interface FunctionsInfo {
    main : string;
    functions : FuncsStore;
}

const path = process.cwd();

/**
 * A way to manipule more easyer
 * the generated functions.
 */
export default class Diagram {

    public constructor(
        private functions : FuncsStore,
        private fname : string
    ){};

    /**
     * Generate a sample web page with the template
     * to view the functions characteristics.
     */
    generate(path : string) : void {

        const dstPath : string = path + "/diagram-" + this.fname;
        const functionsInfo : FunctionsInfo = {
            main: this.fname,
            functions: this.functions
        };

        fs.cpSync(path + "template", dstPath, { recursive: true });

        ejs.renderFile(path + "template/index.ejs", { functionsInfo: JSON.stringify(functionsInfo) }, {}, (err : Error, str : string) => {

            if(err) throw err;
            fs.writeFileSync(dstPath + "/index.html", str);
            fs.unlinkSync(dstPath + "/index.ejs");

        });
    };

    /**
     * List of all the functions
     */
    getFunctions() : string {
        return Object.keys(this.functions).join("\n");
    };

    /**
     * Get all the function info
     */
    getFunctionInfo(name : string) : string {

        const fobj : FuncObj = this.functions[name];
        let calls : string = "";
        
        for(const call in fobj.calls){
            const times : number = fobj.calls[call];
            calls += call + " [" + times + "]\n";
        };

        return "[Name] " + fobj.func.name + "\n[Params] " + fobj.func.params.join(", ") + "\n[Body] " + fobj.func.body + "\n[Calls]\n" + calls;

    };

};