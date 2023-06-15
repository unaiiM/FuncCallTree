
export interface Func {
    name : string;
    params : string[];
    body : string;
};  

/**
 * Parse func to get func info and maipule it
 */
export default class FuncParser {

    private func : string;

    /**
     * Pass the unknown function
     */
    public constructor(func : ((...args: unknown[]) => unknown) | undefined = undefined){
        if(!func) this.func = "";
        else this.func = func.toString();
    };

    /**
     * Parse the function
     */
    public parse() : Func {

        const func : Func = {
            name : this.getName(),
            params : this.getParams(),
            body : this.getBody()
        };

        return func;

    };

    /**
     * Get function name, if the function is anon then set
     * the name of the function as anon
     */
    public getName() : string {
        
        let name : string;

        if(this.isAnon()) name = "anon";
        else {
            name = this.func.slice("function ".length, this.func.indexOf("("));
        };

        return name;
    };

    /**
     * Get the params of a function
     */
    public getParams() : string[] {

        const params : string = this.func.slice(this.func.indexOf('(') + 1, this.func.indexOf(')'));
        const arrParams : string[] = params.split(',').map((param : string) => param.trim());

        if(arrParams.length === 1 && arrParams[0] === '') return [];
        else return arrParams;

    };

    /**
     * Get the string body of the function
     */
    public getBody() : string {
        
        const body : string = this.func.slice(this.func.indexOf('{') + 1, this.func.length - 1);
        return body.trim();
    };

    /**
     * Check if the function is anon by checking if the keyword 
     * function is present
     */
    public isAnon() : boolean {

        const word : string = "function";
        return this.func.slice(0, word.length) !== word;

    };

    /**
     * Set new function to manipulate it
     */
    public setNewFunc(func : (...args: unknown[]) => unknown) : void {
        this.func = func.toString();    
    };

};