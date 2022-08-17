const mainContainer = document.querySelector("#main-container");
const sketchContainer = document.querySelector("#sketch-container");

let sketchContainerWidth = sketchContainer.clientWidth;
sketchContainer.style.height = `${sketchContainer.clientWidth}px`;

function createGridLayout(column, row){
    let childContainerWidth = sketchContainer.clientWidth/column;
    let childContainerHeight = sketchContainer.clientHeight/row;

    // prepare extra column which push grid into new row
    column++;

    for(let i=0; i<(column * row); i++){

        const childContainer = document.createElement("div");
        childContainer.classList = "child-container";

        // column that located at beginning of new row
        if(i%column === 0){
            childContainer.style.border = "0";
            childContainer.style.width = "100%";
            childContainer.style.height = "0";
        }else{
            childContainer.style.width = `${childContainerWidth}px`;
            childContainer.style.height = `${childContainerHeight}px`;
        }
        sketchContainer.appendChild(childContainer);
    }
};

const button = document.querySelector("button");
const buttonColorBlack = document.querySelector("#button-color-black");
const buttonEraser = document.querySelector("#button-color-white");
const buttonColorRandom = document.querySelector("#button-color-random");
const buttonColorGradualBlack = document.querySelector("#button-color-gradual-black");
let latestButtonPressed = "black";

// use for gradual black effect at function paintSquare
let percentageColor;

function recordLatestButton(){
    buttonColorBlack.addEventListener("click", ()=>{
        latestButtonPressed = "black";
    });
    buttonEraser.addEventListener("click", ()=>{
        latestButtonPressed = "white";
    });
    buttonColorRandom.addEventListener("click", ()=>{
        latestButtonPressed = "random";
    });
    buttonColorGradualBlack.addEventListener("click", ()=>{
        latestButtonPressed = "gradualBlack";
        percentageColor = 255;
    });
};

let childContainers;
function paintSquare(){
    percentageColor = 255;
    childContainers = document.querySelectorAll(".child-container");
    childContainers.forEach((childContainer)=>{
        childContainer.addEventListener("mouseover", ()=>{
            let color;
            if(latestButtonPressed === "black"){
                color = "rgb(20,20,20)";
            }else if(latestButtonPressed === "white"){
                color = "rgb(200,200,200)";
            }else if(latestButtonPressed === "random"){
                color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            }else if(latestButtonPressed === "gradualBlack"){
                color = `rgb(${percentageColor},${percentageColor},${percentageColor})`;
                if(percentageColor > 0){
                    percentageColor -= 25.5;
                }
            }
            childContainer.style.backgroundColor = color;
        });
    });
}



let squareAmount = 16;
button.addEventListener("click", ()=>{
    squareAmount = window.prompt("Please enter new square amount. (Maximum amount: 100)", 16);
    if(squareAmount > 100){
        window.alert("Invalid input. Please try again.");
        return;
    }

    sketchContainer.innerHTML = "";
    createGridLayout(squareAmount, squareAmount);
    childContainers = null;
    paintSquare();
});

createGridLayout(squareAmount, squareAmount);
recordLatestButton();
paintSquare();