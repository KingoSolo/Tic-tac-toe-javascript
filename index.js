//setting up the gameboard Module
let gameBoardModule = (function(){
    let gameBoard = ["","","","","","","","",""];

//render function displays to game to the screen
    const render=()=>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell,index) =>{
            cell.textContent = gameBoard[index];
        });
    }
    
    return {render,
    };
})();

//factory function to create players
const createPlayer = (name,mark) => {
        return {
            name,
            mark 
        };
    };

//tells the game what to do
const Game = (() => {
    let players =[];
    let currentPlayerIndex;
    let gameOver;

    const start =() =>{
        players =[
                  createPlayer(document.querySelector("#player1").value,"X"),
                  createPlayer(document.querySelector("#player2").value, "0")
                ]
                currentPlayerIndex=0;
                gameOver = false;
                gameBoardModule.render();
    };

    const handleClick = (event) =>{
        console.log(event)
    }
    return{
        start,handleClick
    };
})();
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
      const gameContainer = document.querySelector(".game-container");
      gameContainer.style.display = "block";
      Game.start();
      Game.handleClick()
      
    });
  });

  
  
