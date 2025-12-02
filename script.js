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

  let activePlayer = players[0] ; 

  const switchPlayerTurn = () => {
    activePlayer=activePlayer===players[0]?players[1]:players[0];
  };
  const getActivePlayer = () => activePlayer ;

  const printNewRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (index) => {
    console.log(`Dropping ${getActivePlayer().name}'s token into spot ${index}...`);
    
    Gameboard.placeMarker(index,activePlayer.marker);
    // Step B: Check for a winner (OPTIONAL: You can skip this for now to just get the game loop working)
    
    switchPlayerTurn();
    printNewRound();
  };

  // Return the public functions
  return { 
    playRound, 
    getActivePlayer 
  };
})();