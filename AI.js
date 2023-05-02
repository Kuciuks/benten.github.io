//store pieces WHITE/BLACK
let black_pieces = [];
let white_pieces = [];

//store all possible moves
let all_piece_moves = [];

//store chess board
let chess_board = []

//control depth, ply
let depth = 3

//store alpha beta initial values
let alpha = -Infinity;
let beta = Infinity;


let checkedBoardCount = 0;


function InitiateAI(){
    
    //get main board
    chess_board = getBoard();

    //store a copy of the main board
    checking_board = getBoard();

    //get player
    let currentPLayer = whoTurn(toggle);
    
    //if player turn Black then activate minimax
    if(currentPLayer == true){
        let [value1, value2] = minimax(depth, checking_board, currentPLayer,alpha, beta)
        //console.log("Minimax Value : ", value2, " Best move : ", value1);
        moveBestPiece(value1.from, value1.to);
        //console.log("Total checked boards: ", checkedBoardCount)
        checkedBoardCount = 0;
        //console.log(pieceNameMemAI,"ALL MOVE PIECE NAMES")
        toggle++;
    }

    //upload images, repaint tiles, reset values
    upload_Images()
    paintTiles()
    all_piece_moves = [];
    black_pieces=[];
    white_pieces = [];
}
InitiateAI()

//gets white pieces from the board
function getWhitePiece(board){
    for(let i = 0; i < board.length; i++){
        if(document.getElementById(board[i]).innerText[0] == "W"){
            white_pieces.push(board[i]);
    
        }
    }
    return white_pieces
}

//gets black pieces from the board
function getBlackPiece(board){
    for(let i = 0; i < board.length; i++){
        if(document.getElementById(board[i]).innerText[0] == "B"){
            black_pieces.push(board[i]);
    
        }
    }
    return black_pieces
}

//makes a move from - to, with the best move from minimax
function moveBestPiece(from, to){
    document.getElementById(to).innerText = document.getElementById(from).innerText;
    document.getElementById(from).innerText = "";
    chess_board = getBoard();
}

let pieceNameMemAI = [];
let pieceNameMemHU = [];
let count = 0;
//minimax returns best score and best move for black pieces
function minimax(depth,board, maximizingPlayer, alpha, beta){

    //return a score if depth == 0
    if(depth == 0){
        //board = chess_board;
        console.log("_______________________________")
        return evaluateBoard(board)
    }

    //if AI turn
    if(maximizingPlayer){

        black_pieces = []
        //console.log("BLACK SWITCH")

        //declare the best score, move
        let bestScore = -Infinity;
        let bestMove = null;

        //store available moves 
        black_pieces = getBlackPiece(board);
        
        //find all available moves
        let moves = availableMoves(black_pieces,false);
        //console.log(black_pieces,"__________ BLACK PIECES")
        //console.log("black moves", moves)

        //go through object list
        for(let i = 0; i < moves.length; i++){
            //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@   Piece count:  ",i,)
            

            //take object and measure how many moves can it make
            
            try{
                //take object and measure how many moves can it make
                for(let j =0; j < moves[i].To.length; j++){
                    //console.log("Moving ", document.getElementById(moves[i].From).innerText, " from ", document.getElementById(moves[i].From).id, " to ", document.getElementById(moves[i].To[j]).id);
                    //count++;
                    //console.log(count, " MOVE COUNT");  
                    //store current tile inner text
                    tiletxt = document.getElementById(moves[i].To[j]).innerText;
                    //console.log(tiletxt, " TILE TXT")
                    
                    console.log(moves,"_________ BLACK MOVES")
                    pieceNameMemAI.push({ "FROM": moves[i].From, "fromNAME": document.getElementById(moves[i].From).innerText, "TO": moves[i].To[j], "toNAME": document.getElementById(moves[i].To[j]).innerText, "PLAYER": maximizingPlayer});

                    //declare board copy, move the object to each location  
                    board = makeMove(moves[i].To[j], moves[i].From);
                    
                    //get a score for the board
                    let score = minimax(depth - 1, board, false,alpha,beta);
                    
                    //console.log("Move: ", moves[i].From, moves[i].To[j], " and resulting score: ", score, " B");
                    //print score for black piece
                    //console.log("Score for black piece: ",score)

                    //console.log(score,"---- Black Score")
                    //check if score is greater than bestScore
                    if(score > bestScore){
                        bestScore = score;
                        bestMove = {"from": moves[i].From, "to": moves[i].To[j]}
                        black_pieces = [];
                        alpha = bestScore;
                    }
                    checkedBoardCount++;
                    //declare undone board
                    board = undoMove(maximizingPlayer)
                    

                }
            }
            catch{} 
        }
        return [bestMove, bestScore]
        
    }
    //if player turn
    else {

        white_pieces = []
        //console.log("WHITE SWITCH")

        //declare the best score
        let bestScore = Infinity;

        //store available moves moves
        white_pieces = getWhitePiece(board) 

        // uses the altered board and get all pieces for white
        
        moves = availableMoves(white_pieces,true);

        //console.log(white_pieces,"__________ WHITE PIECES")
        //console.log("white moves", moves)

        //go through object list
        for(let i = 0; i < moves.length; i++){
           // console.log("Piece count:  ",i,)

            //take object and measure how many moves it can make
            //try{
                    
                for(let j =0; j < moves[i].To.length; j++){
                    //console.log("Moving ", document.getElementById(moves[i].From).innerText, " from ", document.getElementById(moves[i].From).id, " to ", document.getElementById(moves[i].To[j]).id);
                    
                    //store current tile inner text
                    tiletxt2 = document.getElementById(moves[i].To[j]).innerText;

                    console.log(moves,"_________ WHITE MOVES")
                    pieceNameMemHU.push({ "FROM": moves[i].From, "fromNAME": document.getElementById(moves[i].From).innerText, "TO": moves[i].To[j], "toNAME": document.getElementById(moves[i].To[j]).innerText, "PLAYER": maximizingPlayer});

                    //declare board copy, move the object to each location
                    board = makeMove(moves[i].To[j], moves[i].From);
                    //black_pieces=[]
                    
                    //get a score for the board
                    let score = minimax(depth - 1, board, true,alpha,beta);

                    //console.log(moves);
                    //let evaldScore = score[1];

                    if(typeof(score) == "object"){
                        score = score[1];
                    }
                    //console.log(score,"---- White Score")
                    //console.log("Move: ", moves[i].From, moves[i].To[j], " and resulting score: ", score, " W");
                    //print score for black piece
                    //console.log("Score for white piece: ",score," move count: ",i)

                    //check if score is greater than bestScore
                    if(score < bestScore){
                        bestScore = score;
                        beta = bestScore;
                    }
                    //declare undone board
                    board = undoMove(maximizingPlayer)

                }
            //}
            //catch{}
        }
        return bestScore
    }
}

let moveCount = 0;
let moveStorage = [];
//make move from - to, returns an altered board
function makeMove(to, from){
    if(to !== null){
        //moveStorage.push({to,from});
        //moveCount++;

        document.getElementById(to).innerText = document.getElementById(from).innerText;

        document.getElementById(from).innerText = "";

        boardCopy = getBoard(); 
        upload_Images()
        paintTiles()
        return boardCopy;
    }
}

//undoes move from to - from, returns board minues previous move
function undoMove(player){

    if(player == true){

        document.getElementById(pieceNameMemAI[pieceNameMemAI.length-1].FROM).innerText = pieceNameMemAI[pieceNameMemAI.length-1].fromNAME;

        document.getElementById(pieceNameMemAI[pieceNameMemAI.length-1].TO).innerText = pieceNameMemAI[pieceNameMemAI.length-1].toNAME;
        pieceNameMemAI.pop(pieceNameMemAI[pieceNameMemAI.length-1])
        boardCopy = getBoard()
        upload_Images()
        paintTiles()
        return boardCopy;
    }
    if(player == false){

        document.getElementById(pieceNameMemHU[pieceNameMemHU.length-1].FROM).innerText = pieceNameMemHU[pieceNameMemHU.length-1].fromNAME;
        
        document.getElementById(pieceNameMemHU[pieceNameMemHU.length-1].TO).innerText = pieceNameMemHU[pieceNameMemHU.length-1].toNAME;
        pieceNameMemHU.pop(pieceNameMemHU[pieceNameMemHU.length-1])
        boardCopy = getBoard()
        upload_Images()
        paintTiles()
        return boardCopy;
    }
}

//search through all of the black pieces and find possible moves, add them to array and before returning the array run through checkValid function to remove all illegal moves
function availableMoves(pieces,player){
    all_piece_moves = []
    
    //if(player == true){
    ///    pieces.forEach(tile => {
    //        if(document.getElementById(tile).innerText[0] == ""){
    //            pieces.pop(tile);
    //        }
    //    })
    //}
    //else{
    //    pieces.forEach(tile => {
    ///        if(document.getElementById(tile).innerText[0] == ""){
    //            pieces.pop(tile);
    //        }
    //    })
    //}
    pieces.forEach(tile =>{

        if(player == true){
            if(document.getElementById(tile).innerText[0] == ""){
                pieces.pop(tile);
            }
        }else{
            if(document.getElementById(tile).innerText[0] == ""){
                pieces.pop(tile);
            }
        }

        let obj = {}
        let store_chosen_tile = [];
        let store_possible_tile_moves = []
        store_chosen_tile = document.getElementById(tile).id;
        let innerText = document.getElementById(tile).innerText;

        let row = eval(document.getElementById(tile).id[0]);
        let col = eval(document.getElementById(tile).id[2]);

        switch(innerText){
        
            case "B-Pawn":                
            
                try{
                    //if(document.getElementById(`${row+2}-${col}`).innerText == ""){
                    //    store_possible_tile_moves.push(document.getElementById(`${row+2}-${col}`).id);
                    //}

                    if(document.getElementById(`${row+1}-${col}`).innerText == ""){
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col}`).id);
                    }
        
                    if(document.getElementById(`${row+1}-${col+1}`).innerText[0] == "W"){
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col+1}`).id);
                    }
                    
                    if(document.getElementById(`${row+1}-${col-1}`).innerText[0] == "W"){
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col-1}`).id);
                    }
                }
                catch{}

                
                
            break;

            case "W-Pawn":    
                try{
                    //if(document.getElementById(`${row-2}-${col}`).innerText == "" ){
                    //    store_possible_tile_moves.push(document.getElementById(`${row-2}-${col}`).id);
                    //}

                    if(document.getElementById(`${row-1}-${col}`).innerText == ""){
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col}`).id);
                    }
        
                    if(document.getElementById(`${row-1}-${col-1}`).innerText[0] == "B"){
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col-1}`).id);
                    }
                    
                    if(document.getElementById(`${row-1}-${col+1}`).innerText[0] == "B"){
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col-1}`).id);
                    }
                }
                catch{}

            break;

            case "B-Night":
                try{

                    if(row >= 3 && col > 1){
                        //document.getElementById(`${row-2}-${col-1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-2}-${col-1}`).id)
                    }
                    if(row >= 3 && col < 8){
                        //document.getElementById(`${row-2}-${col+1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-2}-${col+1}`).id)
                    }
                    if(row > 1 && col >= 3){
                        //document.getElementById(`${row-1}-${col-2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col-2}`).id)
                    }
                    if(row > 1 && col < 7){
                        //document.getElementById(`${row-1}-${col+2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col+2}`).id)
                    }
                    if(row < 8 && col >= 3){
                        //document.getElementById(`${row+1}-${col-2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col-2}`).id)
                    }
                    if(row < 8 && col < 7){
                        //document.getElementById(`${row+1}-${col+2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col+2}`).id)
                    }
                    if(row < 7 && col > 1){
                        //document.getElementById(`${row+2}-${col-1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+2}-${col-1}`).id)
                    }
                    if(row < 7 && col < 8){
                        //document.getElementById(`${row+2}-${col+1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+2}-${col+1}`).id)
                    }
                }
                catch{

                }
            break;

            case "W-Night":
                                try{

                    if(row >= 3 && col > 1){
                        //document.getElementById(`${row-2}-${col-1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-2}-${col-1}`).id)
                    }
                    if(row >= 3 && col < 8){
                        //document.getElementById(`${row-2}-${col+1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-2}-${col+1}`).id)
                    }
                    if(row > 1 && col >= 3){
                        //document.getElementById(`${row-1}-${col-2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col-2}`).id)
                    }
                    if(row > 1 && col < 7){
                        //document.getElementById(`${row-1}-${col+2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row-1}-${col+2}`).id)
                    }
                    if(row < 8 && col >= 3){
                        //document.getElementById(`${row+1}-${col-2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col-2}`).id)
                    }
                    if(row < 8 && col < 7){
                        //document.getElementById(`${row+1}-${col+2}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+1}-${col+2}`).id)
                    }
                    if(row < 7 && col > 1){
                        //document.getElementById(`${row+2}-${col-1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+2}-${col-1}`).id)
                    }
                    if(row < 7 && col < 8){
                        //document.getElementById(`${row+2}-${col+1}`).style.backgroundColor = "green";
                        store_possible_tile_moves.push(document.getElementById(`${row+2}-${col+1}`).id)
                    }
                }
                catch{
                    
                }
            break;

            case "B-Rook":


                ahead = 8 - col;
                behind = col - 1;
                below = 8 - row;
                up = row - 1;

                
                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)
            
                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W" || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W" || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (k = 1; k <= below; k++){
                    if(document.getElementById(`${row+k}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W" || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (l = 1; l <= up; l++){
                    if(document.getElementById(`${row-l}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W" || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
            break;

            case "W-Rook":


                ahead = 8 - col;
                behind = col - 1;
                below = 8 - row;
                up = row - 1;

                
                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)
            
                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W" || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W" || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (k = 1; k <= below; k++){
                    if(document.getElementById(`${row+k}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W" || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (l = 1; l <= up; l++){
                    if(document.getElementById(`${row-l}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W" || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
            break;

            case "B-Bishop":
                for(i = 1; i < 9; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText == "" || document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                            
                        }
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            i=9
                        }
                        //console.log(i,"COUNT _________-")

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 9; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText == "" || document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            j=9
                        }

                    }
                    catch(err){

                    }

                }


                for(k = 1; k < 9; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText == "" || document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            k=9
                        }

                    }
                    catch(err){

                    }

                }

                for(l = 1; l < 9; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText == "" || document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            l=9
                        }

                    }
                    catch(err){

                    }

                }



            

            break;
        
            case "W-Bishop":
                for(i = 1; i < 9; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText == "" || document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                            
                        }
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            i=9
                        }
                        //console.log(i,"COUNT _________-")

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 9; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText == "" || document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            j=9
                        }

                    }
                    catch(err){

                    }

                }


                for(k = 1; k < 9; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText == "" || document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            k=9
                        }

                    }
                    catch(err){

                    }

                }

                for(l = 1; l < 9; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText == "" || document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                            
                        }
                        msg = "";
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            l=9
                        }

                    }
                    catch(err){

                    }

                }


            

            break;

            case "B-Queen":
                ahead = 8 - col;
                behind = col - 1;
                below = 8 - row;
                up = row - 1;


                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)
            
                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W" || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W" || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (k = 1; k <= below; k++){
                    if(document.getElementById(`${row+k}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W" || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (l = 1; l <= up; l++){
                    if(document.getElementById(`${row-l}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W" || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for(i = 1; i < 9; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            i=9
                        }
                        store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            i=9
                        }

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 9; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            j=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            j=9
                        }

                    }
                    catch(err){

                    }

                }


                for(k = 1; k < 9; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            k=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            k=9
                        }

                    }
                    catch(err){

                    }

                }

                for(l = 1; l < 9; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            l=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            l=9
                        }

                    }
                    catch(err){
                    }

                }
            break;
        
            case "W-Queen":
                ahead = 8 - col;
                behind = col - 1;
                below = 8 - row;
                up = row - 1;


                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)
            
                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W" || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W" || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (k = 1; k <= below; k++){
                    if(document.getElementById(`${row+k}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W" || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for (l = 1; l <= up; l++){
                    if(document.getElementById(`${row-l}-${col}`) == null){
                        break;
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W" || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break;
                    }
                }
            
                for(i = 1; i < 9; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            i=9
                        }
                        store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            i=9
                        }

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 9; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            j=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            j=9
                        }

                    }
                    catch(err){

                    }

                }


                for(k = 1; k < 9; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            k=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            k=9
                        }

                    }
                    catch(err){

                    }

                }

                for(l = 1; l < 9; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            l=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            l=9
                        }

                    }
                    catch(err){
                    }

                }
            break;

            case "B-King":
                ahead = 1;
                behind = 1;
                below = 1;
                up = 1;


                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)

                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W"){
                        i=9;
                    }
                }



                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W"){
                        j=9;
                    }
                }



                for (k = 1; k <= below; k++){

                    if(document.getElementById(`${row+k}-${col}`) == null || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W"){
                        k=9;
                    }
                }
        


                for (l = 1; l <= up; l++){

                    if(document.getElementById(`${row-l}-${col}`) == null || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W"){
                        l=9;
                    }
                }
            
                for(i = 1; i < 2; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            i=9
                        }
                        store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            i=9
                        }

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 2; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            j=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            j=9
                        }

                    }
                    catch(err){
                    }

                }


                for(k = 1; k < 2; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            k=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            k=9
                        }

                    }
                    catch(err){
                    }

                }

                for(l = 1; l < 2; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            l=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            l=9
                        }

                    }
                    catch(err){
                    }

                }
            break;
        
            case "W-King":
                ahead = 1;
                behind = 1;
                below = 1;
                up = 1;


                for (i = 1; i <= ahead; i++){
                    if(document.getElementById(`${row}-${col+i}`) == null || document.getElementById(`${row}-${col+i}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col+i}`).id)

                    if(document.getElementById(`${row}-${col+i}`).innerText[0] == "W"){
                        i=9;
                    }
                }



                for (j = 1; j <= behind; j++){
                    if(document.getElementById(`${row}-${col-j}`) == null || document.getElementById(`${row}-${col-j}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row}-${col-j}`).id)
                    if(document.getElementById(`${row}-${col-j}`).innerText[0] == "W"){
                        j=9;
                    }
                }



                for (k = 1; k <= below; k++){

                    if(document.getElementById(`${row+k}-${col}`) == null || document.getElementById(`${row+k}-${col}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row+k}-${col}`).id)
                    if(document.getElementById(`${row+k}-${col}`).innerText[0] == "W"){
                        k=9;
                    }
                }
        


                for (l = 1; l <= up; l++){

                    if(document.getElementById(`${row-l}-${col}`) == null || document.getElementById(`${row-l}-${col}`).innerText[0] == "B"){
                        break
                    }
                    store_possible_tile_moves.push(document.getElementById(`${row-l}-${col}`).id)
                    if(document.getElementById(`${row-l}-${col}`).innerText[0] == "W"){
                        l=9;
                    }
                }
            
                for(i = 1; i < 2; i++){

                    try{

                        msg = "";
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "B"){
                            i=9
                        }
                        store_possible_tile_moves.push(document.getElementById(`${row-i}-${col-i}`).id);
                        if(document.getElementById(`${row-i}-${col-i}`).innerText[0] == "W"){
                            i=9
                        }

                    }
                    catch(err){

                    }

                }


                for(j = 1; j < 2; j++){

                    try{
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "B"){
                            j=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row-j}-${col+j}`).id);
                        if(document.getElementById(`${row-j}-${col+j}`).innerText[0] == "W"){
                            j=9
                        }

                    }
                    catch(err){
                    }

                }


                for(k = 1; k < 2; k++){

                    try{
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "B"){
                            k=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+k}-${col-k}`).id);
                        if(document.getElementById(`${row+k}-${col-k}`).innerText[0] == "W"){
                            k=9
                        }

                    }
                    catch(err){
                    }

                }

                for(l = 1; l < 2; l++){

                    try{
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "B"){
                            l=9
                        }
                        msg = "";
                        store_possible_tile_moves.push(document.getElementById(`${row+l}-${col+l}`).id);
                        if(document.getElementById(`${row+l}-${col+l}`).innerText[0] == "W"){
                            l=9
                        }

                    }
                    catch(err){
                    }

                }
            break;
        }

        
        //check and update valid move board
        store_possible_tile_moves = checkValid(store_possible_tile_moves,player);
        obj = {"From":store_chosen_tile,"To":store_possible_tile_moves}

        all_piece_moves.push(obj);

        if(obj.To.length == 0){
            all_piece_moves.pop(obj);
        }

    })
    return all_piece_moves;
}

//gets board
function getBoard(){
    let new_board = []
    let txt = []
    document.querySelectorAll(".tile").forEach(tile => {
        new_board.push(tile.id);
        txt.push(tile.innerText);
    })
    return new_board;
}

//returns the valid move board, if a move is illegal then highlights it red
function checkValid(tile,player){
    //console.log(tile);
    valid = []


    //console.log(tile," POSSIBLE MOVES FOR ",player)
    switch(player){
        case true:
            tile.forEach( tile => {

                if(document.getElementById(tile).innerText == "" || document.getElementById(tile).innerText[0] == "B"){
                    
                   
                    valid.push(tile)
                    document.getElementById(tile).style.backgroundColor = "green";
                }
                
            })

            return valid;

        case false:
            tile.forEach( tile => {
                if(document.getElementById(tile).innerText == "" || document.getElementById(tile).innerText[0] == "W"){
                    
                    valid.push(tile)
                    document.getElementById(tile).style.backgroundColor = "green";
                }
            })
            return valid;

    }
            
}

//evaluates the board for AI player and return the score;
function evaluateBoard(chess_board){
    //store piece values
    const values = {
        "P": 100,
        "N": 300,
        "B": 300,
        "R": 500,
        "Q": 900,
        "K": 20000
    }

    //store mapped out positional values
    const pawnScore= [
        0  ,0  ,0   ,0   ,0   ,0   ,0  ,0,
        10, 10, 10, 10, 0, 0, 10, 10,
        5, 5, 5, 5, 50, 0, 0, 5,
        0, 0, 0, 0, 0, 0, 0, 0,
        -5, -5, -5, -5, -5, -10, 0, -5,
        -10, -10, -10, -10, 0, 0, -10, -10,
        -15, -15, -15, -15, -15, -15, -15, -15,
        0  ,0  ,0   ,0   ,0   ,0   ,0  ,0
    ]

    const knightScore = [
        -20, -15, -10, -10, -10, -10, -15, -20,
        -15, -5, 0, 0, 0, 0, -5, -15,
        -10, 0, 5, 5, 5, 5, 0, -10,
        -10, 0, 5, 10, 10, 5, 0, -10,
        -10, 0, 5, 10, 10, 5, 0, -10,
        -10, 0, 5, 5, 5, 5, 0, -10,
        -15, -5, 0, 0, 0, 0, -5, -15,
        -20, -15, -10, -10, -10, -10, -15, -20
    ];

      const bishopScore = [
        -10, -5, -5, -5, -5, -5, -5, -10,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 5, 5, 5, 5, 0, -5,
        -5, 5, 5, 10, 10, 5, 5, -5,
        -5, 0, 10, 10, 10, 10, 0, -5,
        -5, 10, 10, 10, 10, 10, 10, -5,
        -5, 5, 0, 0, 0, 0, 5, -5,
        -10, -5, -5, -5, -5, -5, -5, -10
    ];
      
      const rookScore = [
        0, 0, 0, 0, 0, 0, 0, 0,
        5, 10, 10, 10, 10, 10, 10, 5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        0, 0, 0, 5, 5, 0, 0, 0
    ];
      
      const queenScore = [
        -20,-10,-10, -5, -5,-10,-10,-20,
        -10,  0,  0,  0,  0,  0,  0,-10,
        -10,  0,  5,  5,  5,  5,  0,-10,
         -5,  0,  5,  5,  5,  5,  0, -5,
          0,  0,  5,  5,  5,  5,  0, -5,
        -10,  5,  5,  5,  5,  5,  0,-10,
        -10,  0,  5,  0,  0,  0,  0,-10,
        -20,-10,-10, -5, -5,-10,-10,-20
    ];

    const kingScore = [
        20, 30, 10, 0, 0, 10, 30, 20,
        20, 20, 0, 0, 0, 0, 20, 20,
        -10, -20, -20, -20, -20, -20, -20, -10,
        -20, -30, -30, -40, -40, -30, -30, -20,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30
    ]

    let score = 0;

    //gets a piece and alters the score accordingly
    chess_board.forEach(tile =>{
        let index = chess_board.indexOf(tile);
        let piece = document.getElementById(tile).innerText[2];
        let innTxt = document.getElementById(tile).innerText;
        let pieceValue = values[piece];

        //if piece = white ( minus score )
        if(document.getElementById(tile).innerText[0]=="W"){
            score-= pieceValue;
        }
        
        //if piece = black ( plus score ), gets positional value ( plus score )
        if(document.getElementById(tile).innerText[0]=="B"){
            score+= pieceValue;
            if(innTxt == "B-Pawn"){
                score += pawnScore[index];
            }
            if(innTxt == "B-Night"){
                score += knightScore[index];
            }
            if(innTxt == "B-Rook"){
                score += rookScore[index];
            }
            if(innTxt == "B-Bishop"){
                score += bishopScore[index];
            }
            if(innTxt == "B-Queen"){
                score += queenScore[index];
            }
            if(innTxt == "B-King"){
                score += kingScore[index];
            }
        }
    })
    return score;
}






//scrap code for random moves
function randomMove(pieceObj){
    //capture random piece
    let random_piece = pieceObj[Math.floor(Math.random() * pieceObj.length)];
    console.log(random_piece,"captured piece object");
    //store all moves for captured piece in array
    let moveArr = []
    moveArr = random_piece.To;

    //get a random move for the captured piece from move array
    let random_move = moveArr[Math.floor(Math.random() * moveArr.length)];
    
    let newMove = {"From": random_piece.From, "To": random_move}
    return newMove;
}

