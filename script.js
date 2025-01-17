let gameboard = [["","",""],
                 ["","",""],
                 ["","",""]];
let container = document.querySelector("#container");
let gridBlock = document.querySelector("#grid");
let form = document.querySelector("form");
let modal = document.querySelector("#modal");
let currentTurnOf = document.querySelector("#currentTurnOf");
let winResultModal = document.querySelector("#winResult");
let winResultModalName = document.querySelector("#winResultName");


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
            let selectedCell = document.querySelector(`#c-${row}${column}`);
            selectedCell.textContent = piece;
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

    let  setPlayerData = function(player1Name,player1Piece,player2Name,player2Piece){
        player1.setName(player1Name);
        player1.setPiece(player1Piece);
        player2.setName(player2Name);
        player2.setPiece(player2Piece);
        turnOf = player1.getName();
        piece = player1.getPiece();
        currentTurnOf.textContent = `Current turn: ${turnOf} | Piece: ${piece}`;
    }

    let getCurrentTurn = () => turnOf;
    let getCurrentPiece = () => piece;

    let playTurn = function(row,column){
        let successful = currentTurn.placePiece(row,column,piece);
        grid.update();
        if(currentTurn.isWinner(piece)){
            winResultModalName.textContent = `${turnOf} Wins`;
            winResultModal.style.display = "flex";
            gridBlock.style.display = "none";
            currentTurnOf.textContent = "";
        }else{
            if(successful){
                if(turnOf === player1.getName()){
                    turnOf = player2.getName();
                    piece = player2.getPiece()
                }else{
                    turnOf = player1.getName();
                    piece = player1.getPiece();
                }
            }
            currentTurnOf.textContent = `Current turn: ${turnOf} | Piece: ${piece}`;
        }
    }

    return{
        setPlayerData,
        getCurrentTurn,
        getCurrentPiece,
        playTurn
    }
})()

let grid = (function(){

    function cellFunction(e){
        let position = e.target.id;
        let [row,column] = position.split("-")[1].split("");
        game.playTurn(row,column);
    }

    function addCellsListener(){
        let cells = Array.from(document.querySelectorAll(".cell"));
        cells.forEach(cell => cell.addEventListener("click", cellFunction));
    }

    let update = () =>{
        gridBlock.innerHTML = "";
        for(let row = 0; row < 3;row++){
            let rowOfCells = document.createElement("div");
            rowOfCells.classList.add("row");
            for(let column = 0; column<3;column++){
                let div = document.createElement("div");
                div.textContent = gameboard[row][column];
                div.classList.add("cell");
                div.setAttribute("id",`c-${row}${column}`)
                rowOfCells.appendChild(div);
            }
            gridBlock.appendChild(rowOfCells);
        }
        addCellsListener();
    }

    return{
        update
    }
})()


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    modal.style.display = "none";
    let player1Name = document.querySelector("#player1Name").value;
    let player2Name = document.querySelector("#player2Name").value;
    let player1Piece = document.querySelector("#player1Piece").value;
    let player2Piece = document.querySelector("#player2Piece").value;


    game.setPlayerData(player1Name,player1Piece,player2Name,player2Piece);
    currentTurnOf.style.display = "block";
    gridBlock.style.display = "block";
    grid.update();
})
