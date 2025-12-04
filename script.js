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
          resetBoard();
        }
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
    checkWinner();
    
    switchPlayerTurn();
    printNewRound();
  };

  // Return the public functions
  return { 
    playRound, 
    getActivePlayer 
  };
})();