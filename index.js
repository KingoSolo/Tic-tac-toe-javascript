//setting up the gameboard Module
let gameBoardModule = (function(){
    let gameBoard = ["","","","","","","","",""];

//render function displays to game to the screen
    const render=()=>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell,index) =>{
            cell.textContent = gameBoard[index];
            cell.addEventListener("click", Game.handleClick); 
        });
    }

    const update = (index,value) => {
        gameBoard[index]=value;
        render();
    }
    
    const getGameBoard =() =>{
        return gameBoard;
    }
    return {render,
            update,
            getGameBoard
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
                  createPlayer(document.querySelector("#player2").value, "O")
                ]
                currentPlayerIndex=0;
                gameOver = false;
                gameBoardModule.render();
    };

    const handleClick = (event) =>{
        const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
        if (gameBoardModule.getGameBoard()[cellIndex] !== "") return;
        gameBoardModule.update(cellIndex,players[currentPlayerIndex].mark) 
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
       
      };
      const restart = () =>{console.log("hi")
        for(let i = 0; i<9 ;i++){
            gameBoardModule.update(i,"")
        }
        gameBoardModule.render()
      }
    
    return{
        start,
        restart,
        handleClick
    };
})();
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
      const gameContainer = document.querySelector(".game-container");
      gameContainer.style.display = "block";
      Game.start(); 
    });
  });

  const restartBtn = document.querySelector("#new-game")
  restartBtn.addEventListener("click",()=>{
    Game.restart();
  })

  
  
