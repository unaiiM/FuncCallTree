import * as vm from 'vm';
import FuncParser, { Func } from './func.js';

/**
 * Struct of function, with funcs called in it
 */
export interface FuncObj {
    func : Func,
    calls : FuncTree;
};

/**
 * Where analitzed funcs objects begin stored
 */
export type FuncsStore = Record<string, FuncObj>;

/**
 * Collection of called functions and the 
 * number of times
 */
export type FuncTree = Record<string, number>;

/**
 * Main class
 */
export default class Tree {

    private context : vm.Context = vm.createContext();
    private fparser : FuncParser = new FuncParser();
    public functions : FuncsStore = {};
    private anonCount : number = 0;

    /**
     * Pass the code and the init func to start
     * then the code will be executed in other context
     * to make easyer and safer to acces the functions
     * and manipulate the code
     */
    public constructor(
        private code : string,
        private fname : string
    ){
        vm.runInContext(code, this.context);
    };

    /**
     * Start adding inside the queue the main function
     * then the loop will end when there is no queue left.
     * The loop starts serching the calls and then checking
     * if the calls are alredy stored if is not stored
     * the call are pushed inside the queue where the function
     * of the call will be analitzed and stored.
     */
    public build() : object {

        let queue : string[] = [this.fname]; // FIFO

        while(queue.length > 0){

            const fcall : string = queue[0];
            this.fparser.setNewFunc(this.context[fcall]);
            const func : Func = this.fparser.parse();
            if(this.fparser.isAnon()) func.name += '-' + this.anonCount++;
            let funcs : FuncTree = this.handleCode(func.body);

            for(const name in funcs){
                if(!this.isStored(name) && this.context[name]) queue.push(name);
            };

            const fobj : FuncObj = this.toFuncObj(func, funcs);
            this.storeFunc(func.name, fobj);
            queue.splice(0, 1); // delete the func call from the queue
        
        };

        return this.functions;

    };

    /**
     * Handle the code of a function to find the calls
     * inside it. And check nested calls.
     */
    private handleCode(code : string) : FuncTree {

        let queue : string[] = this.search(code);
        let funcs : FuncTree =  {};

        while(queue.length > 0){

            const call : string = queue[0];
            const name : string = call.slice(0, call.indexOf("("));                
            const params : string = call.slice(call.indexOf("(") + 1, call.length - 1);

            if(funcs[name]) funcs[name]++;
            else funcs[name] = 1;

            queue.splice(0, 1);
            const matches : string[] = this.search(params);
            if(matches) queue = queue.concat(matches);

        };

        return funcs;

    };


    /**
     * Search for function calls, when is founded, the function begins
     * analized if is a definition by skiping the white spaces and when
     * non white space is found check if is open bracket '{' or not,
     * if it is then is a definition, if is not, is not.
     * Atention if is a block after the function call it will handle
     * as a function definition. Example:
     * abc()
     * {
     *  console.log("Hello Wold!")
     * }
     * This is not a function definition!! Is a function call and a block.
     */ 
    private search(code : string) : string[] {

        let found : string[] = [];
        const regex = /[a-z][a-z|0-9|\.]*?(\s*)\(/i;
        let match : RegExpMatchArray;

        do {

            match = code.match(regex);

            if(match){

                let matchLengthIndex : number = match[0].length + match.index;
                let index : number = matchLengthIndex;
                let nSkips : number = 0;

                do {

                    let openIndex : number = code.indexOf("(", index);
                    index = code.indexOf(")", index) + 1;

                    if(openIndex !== -1 && openIndex < index){
                        index = openIndex + 1;
                        nSkips++;
                    }else nSkips--;

                } while(nSkips >= 0);

                // check if is a function definition
                let isDefinition : boolean = false;

                for(let i : number = index; i < code.length && !isDefinition; i++){
                    if(code[i] === ' ') continue;
                    else if(code[i] === '{') isDefinition = true;
                    else {
                        index = i;
                        break;
                    };
                };

                if(!isDefinition) found.push(code.slice(match.index, index));

                code = code.slice(index + 1, code.length);

            };

        }while(match);

        return found;

    };

    /**
     * Pass func call struct to func object
     */
    private toFuncObj(func : Func, calls : FuncTree) : FuncObj {
        return <FuncObj> {
            func : func,
            calls: calls
        };
    };

    /**
     * Check if the function is alredy in the storage
     */
    isStored(name : string) : boolean {
        return this.functions[name] !== undefined;
    };

    /**
     * Add function to the storage
     */
    storeFunc(name : string, func : FuncObj) : void {
        this.functions[name] = func;
    };

};