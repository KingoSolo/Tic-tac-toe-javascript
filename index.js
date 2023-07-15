//message function to show win or tie
const displayController = (() => {
    const renderMessage = (message) =>{
        document.querySelector("#message").innerHTML = message
    }
    return {
        renderMessage
      };
})();
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
        if(gameOver) return;
        if (gameBoardModule.getGameBoard()[cellIndex] !== "") return;
        gameBoardModule.update(cellIndex,players[currentPlayerIndex].mark) 

        if (checkforWin(gameBoardModule.getGameBoard(),players[currentPlayerIndex].mark)){
            gameOver=true;    
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
        }else if(checkforTie(gameBoardModule.getGameBoard(),players[currentPlayerIndex].mark)){
            gameOver=true;  
            displayController.renderMessage("It's a tie!")
         }

        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
       
      };
      const restart = () =>{
        for(let i = 0; i<9 ;i++){
            gameBoardModule.update(i,"")
        }
        gameBoardModule.render();
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
        Game.start();
      }
    
    return{
        start,
        restart,
        handleClick
    };
})();

  function checkforWin(gameBoard){
    const winningCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6]
    ]
    for(let i=0; i<winningCombination.length; i++){
        const [a,b,c] = winningCombination[i]
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] ===gameBoard[c]){
            return true;
        }
    }
    return false
    }

   function checkforTie(gameBoard){
    return gameBoard.every(cell => cell !== "")
  }

  document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#start-button");
    const restartButton = document.querySelector("#restart-button");
  
    startButton.addEventListener("click", () => {
      const gameContainer = document.querySelector(".game-container");
      gameContainer.style.display = "block";
      Game.start();
    });
  
    restartButton.addEventListener("click", () => {
      Game.restart();
    });
  });