//setting up the gameboard Module
let gameBoardModule = (function(){
    let gameBoard = [];
    return {};
})();

//setting up display controller Module
let displayController = (function(){
   let testF = () =>{console.log("hey you")}
   return {testF};
})();

//setting up the player factory function
const createPlayer = (name,mark) => {
    return {
        name,
        mark 
    }
}

//render function to display array
let renderArray (function() {
    const gridBoxes = document.querySelectorsAll(".grid-box");
    return{};
})();