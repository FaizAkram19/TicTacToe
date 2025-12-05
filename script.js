const Gameboard = (function() {
  const board = ["", "", "", "", "", "", "", "",""] ; 

  const getBoard = () => board ;

  const placeMarker = (index, marker) => {
    board[index] = marker ;
  };

  const printBoard = () => {
    console.log(board);
  };

  return { 
    getBoard, 
    placeMarker, 
    printBoard 
  };
})();
const GameController = (function() {
  const players = [
    { name: "Player One", marker: "X" },
    { name: "Player Two", marker: "O" }
  ];
  
  const winCondition=[[0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]];

  let activePlayer = players[0] ; 

  const switchPlayerTurn = () => {
    activePlayer=activePlayer===players[0]?players[1]:players[0];
  };
  const getActivePlayer = () => activePlayer ;

  const printNewRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  const resetBoard=()=>{
    const board=Gameboard.getBoard();
    for(i=0;i<9;i++)
    {
      board[i]="";
    }
    activePlayer=players[0];
  }
  const checkWinner=()=>{
    let activePlayer=getActivePlayer();
    const board=Gameboard.getBoard();
    for(i=0;i<winCondition.length;i++)
    {
      const [a,b,c]=winCondition[i];
      if(board[a]==activePlayer.marker &&
         board[b]==activePlayer.marker &&
         board[c]==activePlayer.marker)
        {
          console.log(`${activePlayer.name} won.`);
          return true;
        }
    }
  }
  const checkTie=()=>{
    let board=Gameboard.getBoard();
    if(board.every(cell=> cell != ""))
    {
      return true;
    }
  }

  const playRound = (index) => {
    const board=Gameboard.getBoard();
    if(board[index] != "")
    {
      console.log(`Index ${index} is not empty, shoose another spot`);
      return ;
    }
    console.log(`Dropping ${getActivePlayer().name}'s token into spot ${index}...`);
    
    Gameboard.placeMarker(index,activePlayer.marker);
    DisplayController.updateScreen();
    if(checkWinner())
    {
      let active=getActivePlayer();
    DisplayController.setResultMsg(`${active.name} won`);
    return;
    }
    if(checkTie())
    {
      DisplayController.setResultMsg("It's a Tie");
      return;
    }
    switchPlayerTurn();
    printNewRound();
  };
  return { 
    playRound, 
    getActivePlayer,
    resetBoard 
  };
})();
const DisplayController=(function(){
  const boardDiv=document.querySelector(".tttBoard");
  const resultDiv=document.querySelector(".result");
  const updateScreen=()=>{
    const board=Gameboard.getBoard();
    
    const squares=document.querySelectorAll(".square");
    squares.forEach((element,index) => {
      element.textContent=board[index];
    });
  }
  const clickHandler=(e)=>{
    const selectedSquare=e.target.dataset.index;
    if(!selectedSquare) return;

    
    GameController.playRound(selectedSquare);
    updateScreen();
  }
  const resetButton=()=>{
    GameController.resetBoard();
    updateScreen();
    resultDiv.textContent="";
  }
  const setResultMsg=(msg)=>{
    resultDiv.textContent=msg;
  }
  const resetBut=document.querySelector(".reset");
  resetBut.addEventListener('click', resetButton);
  boardDiv.addEventListener('click',clickHandler);
  return {updateScreen, 
          clickHandler,
          setResultMsg};

})();