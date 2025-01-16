let gameboard = [["","",""],
                 ["","",""],
                 ["","",""]];

function Player(){
    let name = "";
    let piece = "";

    let setName = (selectedName) => name = selectedName;
    let setPiece = (selectedPiece) => piece = selectedPiece;
    let getPiece = () => piece;
    let getName = () => name;

    return{
        setName,
        getName,
        setPiece,
        getPiece
    }
}

let currentTurn = (function (){
    function isPlacementValid(row,column){
        if(gameboard[row][column] == ""){
            return true
        }
        return false
    }

    function checkCombinations(piece, ...arr){
        let winningCombination = false; 

        arr.forEach(element => {
            if (element.filter((item) => item === piece).length === 3){
                winningCombination = true;
            }
        });
    
        if(winningCombination){
            return true;
        }
    }

    let placePiece = function(row,column,piece){
        if(isPlacementValid(row,column)){
            gameboard[row].splice(column,1,piece);
            return true
        }else{
            return false
        }
    }

    let isWinner = function(piece){
        //we could use magic square if we want
        //check rows
        for(let row=0;row<3;row++){
            let arr = gameboard[row];
            if (checkCombinations(piece,arr)){
                return true
            }
        }

        //check columns
        for(let column=0;column<3;column++){
            let arr = [];
            for(let row=0;row<3;row++){
                arr.push(gameboard[row][column]);
            }
            if (checkCombinations(piece,arr)){
                return true
            }
        }

        //check diagonals
        let firstDiagonal = [gameboard[0][0],gameboard[1][1],gameboard[2][2]];
        let secondDiagonal = [gameboard[0][2],gameboard[1][1],gameboard[2][0]];

        if (checkCombinations(piece,firstDiagonal,secondDiagonal)){
            return true
        }

        return false
    }

    return{
        placePiece,
        isWinner
    }
})()

let game = (function(){

    let player1 = Player();
    let player2 = Player();
    let turnOf = "";
    let piece = "";

    function setPlayerData(){
        player1.setName(prompt("Player 1 name: "));
        player1.setPiece(prompt("Player 1 piece: "));
        player2.setName(prompt("Player 2 name: "));
        player2.setPiece(prompt("Player 2 piece: "));
        turnOf = player1.getName();
        piece = player1.getPiece();
    }

    let start = function(){
        setPlayerData();
        while(true){
            let successfull = currentTurn.placePiece(parseInt(prompt("row: ")),parseInt(prompt("column: ")),piece);
            if(currentTurn.isWinner(piece)){
                break
            }
            if(successfull){
                if(turnOf === player1.getName()){
                    turnOf = player2.getName();
                    piece = player2.getPiece()
                }else{
                    turnOf = player1.getName();
                    piece = player1.getPiece()
                }
            }
        }

        console.log(`${turnOf} wins`);
    }

    return{
        start
    }
})()

