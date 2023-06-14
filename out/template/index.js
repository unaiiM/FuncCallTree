const functionsInfo = JSON.parse(document.getElementById("functions-data").textContent);
const mainFunctionName = functionsInfo.main;
const functions = functionsInfo.functions;
const funcsSection = document.querySelector(".functions");
const displaySection = document.querySelector(".display-function");
const displaySectionOptions = { 
    name: displaySection.querySelector(".name p"),
    params: displaySection.querySelector(".params"),
    body: displaySection.querySelector(".body textarea"),
    calls: displaySection.querySelector(".calls")
};

generateFunctions();
showFunction(mainFunctionName);

function generateFunctions(){

    for(const name in functions){

        const efunc = document.createElement("div");
        efunc.setAttribute("class", "func");
        funcsSection.appendChild(efunc);
        const ename = document.createElement("p");
        ename.textContent = name;
        ename.setAttribute("class", "func-name");
        efunc.appendChild(ename);

        efunc.addEventListener("click", (e) => {
            showFunction(name);
        });

    };

};

/**
 * @param {string} name
 */
function showFunction(name){

    const fobj = functions[name];
    
    if(fobj){
        const func = fobj.func;
        const calls = fobj.calls;

        console.log(func);
        displaySectionOptions.name.textContent = func.name;
        removeChilds(displaySectionOptions.params);
        displayParams(func.params);
        displaySectionOptions.body.textContent = func.body;
        removeChilds(displaySectionOptions.calls);
        displayCalls(calls);
    }else alert("Can not find the function!");

};

/**
 * @param {HTMLElement} parent
 */
function removeChilds(parent){
    while(parent.lastChild){
        parent.removeChild(parent.lastChild);
    };
};

/**
 * @param {string[]} params
 */
function displayParams(params){

    params.forEach((param) => {

        const div = document.createElement("div");
        div.setAttribute("class", "param");
        displaySectionOptions.params.appendChild(div);
        const name = document.createElement("p");
        name.textContent = param;
        div.appendChild(name);

    });

};

/**
 * @param {object} calls 
 */
function displayCalls(calls){

    for(const name in calls){

        const times = calls[name];

        const div = document.createElement("div");
        div.setAttribute("class", "call");
        displaySectionOptions.calls.appendChild(div);
        const eName = document.createElement("div");
        eName.setAttribute("class", "call-name");
        div.appendChild(eName);
        const eNameText = document.createElement("p");
        eNameText.textContent = name;
        eName.appendChild(eNameText);
        const eTimes = document.createElement("div");
        eTimes.setAttribute("class", "call-times");
        div.appendChild(eTimes);
        const eTimesText = document.createElement("p");
        eTimesText.textContent = times;
        eTimes.appendChild(eTimesText);

        div.addEventListener("click", (e) => {
            showFunction(name);
        });

    };
};