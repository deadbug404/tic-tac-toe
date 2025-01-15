let gameboard = [["","",""],
                 ["","",""],
                 ["","",""]];
let winCombinations = [];

function Player(name,piece){
    let score = 0;
    let roundStatus = "none";
    
    let getRoundStatus = () => roundStatus;

    return{
        getRoundStatus
    }

}

let game = (function (){

    let isPlacementValid = function(row,column){
        if(gameboard[row][column] == ""){
            return true
        }
        return false
    }

    let placePiece = function(row,column,piece){
        if(isPlacementValid(row,column)){
            gameboard[row].splice(column,1,piece);
        }
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
