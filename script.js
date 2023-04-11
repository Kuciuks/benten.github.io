//uploads images to tiles based on inner text
function upload_Images(){
    document.querySelectorAll(".tile").forEach(tile => {
        switch(tile.innerText){
            case "":
                break;
            default:
                tile.innerHTML=`${tile.innerText} <img class="pic" src="Assets/${tile.innerText}.png">`;
                tile.style.cursor = "pointer";
                break;
        }
    })
}
upload_Images();

//paints tiles (grey white)
function paintTiles(){
    document.querySelectorAll(".tile").forEach(tile =>{
        
        //Get tiles position(row,col)
        let arr = Array.from(tile.id);
        row = arr.shift();
        col = arr.pop();

        if(row % 2 !== 0){
            if(col % 2 !== 0){
                tile.style.backgroundColor = "white";
            }
            if(col % 2 == 0){
                tile.style.backgroundColor = "grey";
            }
        }
        if(row % 2 == 0){
            if(col % 2 !== 0){
                tile.style.backgroundColor = "grey";
            }
            if(col % 2 == 0){
                tile.style.backgroundColor = "white";
            }
        }
    })
}
paintTiles();

//store turn value
let toggle = 3;

//store player selection
let selection = null;
let selected_letter = ""

//currenly the game can be player [human vs human] and [human vs AI]
//controller for the human player
document.querySelectorAll(".tile").forEach(tile => {
    
    //player movemenet script
    tile.addEventListener("click", event => {
        
        //Get tiles position(row,col)
        let arr = (Array.from(tile.id))
        let row = eval(arr.shift());
        let col = eval(arr.pop());
        

        //if selection is empty and tile text is full 
        if(!selection && tile.innerText !== ""){
            let chess_board = getBoard()
            let a = evaluateBoard(chess_board)
            console.log(a,"Starting score")
            selected_letter = (Array.from(tile.innerText)).shift()

            //update bg color
            tile.style.backgroundColor = "orange";

            //update selection
            selection = tile;

            //store selection id txt
            id = selection.id;
            txt = selection.innerText;

            lastId = (Array.from(id)).pop();
            firstId = (Array.from(id)).shift();

            //check if human turn, if is, show available moves
            if(whoTurn(toggle) == false){
                showMoves("W")
            }

            //Shows moves depending on color
            function showMoves(color){

                switch(tile.innerText){
                    //cases
                    case `${color}-Pawn`:
                        
                    
                        if(color == "W"){
                            try{
                                //if(document.getElementById(`${row-2}-${col}`).innerText == ""){
                                //    document.getElementById(`${row-2}-${col}`).style.backgroundColor = "green";
                                //}

                                if(document.getElementById(`${row-1}-${col}`).innerText == ""){
                                    document.getElementById(`${row-1}-${col}`).style.backgroundColor = "green";
                                }
                    
                                if(document.getElementById(`${row-1}-${col-1}`).innerText !== ""){
                                    document.getElementById(`${row-1}-${col-1}`).style.backgroundColor = "green";
                                }
                                
                                if(document.getElementById(`${row-1}-${col+1}`).innerText !== ""){
                                    document.getElementById(`${row-1}-${col+1}`).style.backgroundColor = "green";
                                }
                            }
                            catch{}
                        }
                        if(color == "B"){
                            try{

                                //if(document.getElementById(`${row+2}-${col}`).innerText == ""){
                                //    document.getElementById(`${row+2}-${col}`).style.backgroundColor = "green";
                                //}
                                if(document.getElementById(`${row+1}-${col}`).innerText == ""){
                                    document.getElementById(`${row+1}-${col}`).style.backgroundColor = "green";
                                }
                    
                                if(document.getElementById(`${row+1}-${col+1}`).innerText !== ""){
                                    document.getElementById(`${row+1}-${col+1}`).style.backgroundColor = "green";
                                }
                                
                                if(document.getElementById(`${row+1}-${col-1}`).innerText !== ""){
                                    document.getElementById(`${row+1}-${col-1}`).style.backgroundColor = "green";
                                }
                            }
                            catch{}
                        }

                        break;
                    
                    case `${color}-Night`:
                        if(color == "W"){                         
                            try{

                                if(row >= 3 && col > 1){
                                    document.getElementById(`${row-2}-${col-1}`).style.backgroundColor = "green";
                                }
                                if(row >= 3 && col < 8){
                                    document.getElementById(`${row-2}-${col+1}`).style.backgroundColor = "green";
                                }
                                if(row > 1 && col >= 3){
                                    document.getElementById(`${row-1}-${col-2}`).style.backgroundColor = "green";
                                }
                                if(row > 1 && col < 7){
                                    document.getElementById(`${row-1}-${col+2}`).style.backgroundColor = "green";
                                }
                                if(row < 8 && col >= 3){
                                    document.getElementById(`${row+1}-${col-2}`).style.backgroundColor = "green";
                                }
                                if(row < 8 && col < 7){
                                    document.getElementById(`${row+1}-${col+2}`).style.backgroundColor = "green";
                                }
                                if(row < 7 && col > 1){
                                    document.getElementById(`${row+2}-${col-1}`).style.backgroundColor = "green";
                                }
                                if(row < 7 && col < 8){
                                    document.getElementById(`${row+2}-${col+1}`).style.backgroundColor = "green";
                                }
                            }
                            catch{
                                
                            }
                        }
                        if(color == "B"){                            
                            if(row >= 3 && col > 1){
                                document.getElementById(`${row-2}-${col-1}`).style.backgroundColor = "green";
                            }
                            if(row >= 3 && col < 8){
                                document.getElementById(`${row-2}-${col+1}`).style.backgroundColor = "green";
                            }
                            if(row > 1 && col >= 3){
                                document.getElementById(`${row-1}-${col-2}`).style.backgroundColor = "green";
                            }
                            if(row > 1 && col < 7){
                                document.getElementById(`${row-1}-${col+2}`).style.backgroundColor = "green";
                            }
                            if(row < 8 && col >= 3){
                                document.getElementById(`${row+1}-${col-2}`).style.backgroundColor = "green";
                            }
                            if(row < 8 && col < 7){
                                document.getElementById(`${row+1}-${col+2}`).style.backgroundColor = "green";
                            }
                            if(row < 7 && col > 1){
                                document.getElementById(`${row+2}-${col-1}`).style.backgroundColor = "green";
                            }
                            if(row < 7 && col < 8){
                                document.getElementById(`${row+2}-${col+1}`).style.backgroundColor = "green";
                            }
                        }
                    
                        break;
                    
                    case `${color}-Rook`:

                        
                        ahead = 8 - lastId;
                        behind = lastId - 1;
                        below = 8 - firstId;
                        up = firstId - 1;
                        if(color == "W"){

                            console.log(lastId);


                            console.log(ahead ," - ahead")
                            console.log(behind ," - behind")
                            console.log(up ," - up")
                            console.log(below ," - below")

                            try{
                                for (i = 1; i <= ahead; i++){
                                    arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                                    if(arr1 == null){
                                        document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                    }
                                    if(arr1 == "W" || arr1 == "B"){
                                        document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                        i=9
                                    }
                                }
    
    
    
                                for (j = 1; j <= behind; j++){
                                    arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                                    if(arr2 == null){
                                        document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                    }
                                    if(arr2 == "W" || arr2 == "B"){
                                        document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                        j=9
                                    }
                                }
    
    
    
                                for (k = 1; k <= below; k++){
                                    arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()
                                    console.log(arr3)
                                    if(arr3 == null){
                                        document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                    }
                                    if(arr3 == "W" || arr3 == "B"){
                                        document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                        k=9;
                                    }
                                }
                        
    
    
                                for (l = 1; l <= up; l++){
                                    arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                                    if(arr4 == null){
                                        document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                    }
                                    if(arr4 == "W" || arr4 == "B"){
                                        document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                        l=9
                                    }
                                }
                            }
                            catch{}
                        }

                            

                        if(color == "B"){

                            console.log(lastId);

                            console.log(ahead ," - ahead")
                            console.log(behind ," - behind")
                            console.log(up ," - up")
                            console.log(below ," - below")


                            
                            for (i = 1; i <= ahead; i++){
                                arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                                if(arr1 == null){
                                    document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                }
                                if(arr1 == "B" || arr1 == "W"){
                                    document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                    i=9
                                }
                            }



                            for (j = 1; j <= behind; j++){
                                arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                                if(arr2 == null){
                                    document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                }
                                if(arr2 == "B" || arr2 == "W"){
                                    document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                    j=9
                                }
                            }



                            for (k = 1; k <= below; k++){
                                arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()
                                if(arr3 == null){
                                    document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                }
                                if(arr3 == "B" || arr3 == "W"){
                                    document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                    k=9;
                                }
                            }
                    


                            for (l = 1; l <= up; l++){
                                arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                                if(arr4 == null){
                                    document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                }
                                if(arr4 == "B" || arr4 == "W"){
                                    document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                    l=9
                                }
                            }
                        }
                        break

                    case(`${color}-Bishop`):
                        if(color == "W"){

                            for(i = 1; i < 9; i++){

                                try{

                                    msg = "";

                                    arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                    if(arr1 == null){
                                        
                                        document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    }
                                    if(arr1 == "W" || arr1 == "B"){
                                        document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                        i=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }


                            for(j = 1; j < 9; j++){

                                try{

                                    msg = "";

                                    arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                    if(arr2 == null){
                                        
                                        document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    }
                                    if(arr2 == "W" || arr2 == "B"){
                                        document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                        j=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }


                            for(k = 1; k < 9; k++){

                                try{

                                    msg = "";

                                    arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                    if(arr3 == null){
                                        
                                        document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";  
                                    }
                                    if(arr3 == "W" || arr3 == "B"){
                                        document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                        k=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }

                            for(l = 1; l < 9; l++){

                                try{

                                    msg = "";

                                    arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                    if(arr4 == null){
                                        
                                        document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";  
                                    }
                                    if(arr4 == "W" || arr4 == "B"){
                                        document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                        l=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }

                        }



                        if(color == "B"){
                            for(i = 1; i < 9; i++){

                                try{

                                    msg = "";

                                    arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                    if(arr1 == null){
                                        
                                        document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    }
                                    if(arr1 == "B" || arr1 == "W"){
                                        document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                        i=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }


                            for(j = 1; j < 9; j++){

                                try{

                                    msg = "";

                                    arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                    if(arr2 == null){
                                        
                                        document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    }
                                    if(arr2 == "B" || arr2 == "W"){
                                        document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                        j=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }


                            for(k = 1; k < 9; k++){

                                try{

                                    msg = "";

                                    arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                    if(arr3 == null){
                                        
                                        document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";  
                                    }
                                    if(arr3 == "B" || arr3 == "W"){
                                        document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                        k=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }

                            for(l = 1; l < 9; l++){

                                try{

                                    msg = "";

                                    arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                    if(arr4 == null){
                                        
                                        document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";  
                                    }
                                    if(arr4 == "B" || arr4 == "W"){
                                        document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                        l=9
                                    }

                                }
                                catch(err){

                                    msg = "Input is" + err;
                                    console.log(msg);
                                }

                            }


                        }

                        break;
                      
                    case(`${color}-Queen`):
                    ahead = 8 - lastId;
                    behind = lastId - 1;
                    below = 8 - firstId;
                    up = firstId - 1;
                    if(color == "W"){

                        console.log(lastId);


                        console.log(ahead ," - ahead")
                        console.log(behind ," - behind")
                        console.log(up ," - up")
                        console.log(below ," - below")



                        for (i = 1; i <= ahead; i++){
                            arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                            if(arr1 == null){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                            }
                            if(arr1 == "B" || arr1 == "W"){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                i=9
                            }
                        }



                        for (j = 1; j <= behind; j++){
                            arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                            if(arr2 == null){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                            }
                            if(arr2 == "B" || arr2 == "W"){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                j=9
                            }
                        }



                        for (k = 1; k <= below; k++){
                            arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()
                            console.log(arr3)
                            if(arr3 == null){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                            }
                            if(arr3 == "B" || arr3 == "W"){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                k=9;
                            }
                        }
                


                        for (l = 1; l <= up; l++){
                            arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                            if(arr4 == null){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                            }
                            if(arr4 == "B" || arr4 == "W"){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                l=9
                            }
                        }

                        for(i = 1; i < 9; i++){

                            try{

                                msg = "";

                                arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                if(arr1 == null){
                                    
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                }
                                if(arr1 == "B" || arr1 == "W"){
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    i=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(j = 1; j < 9; j++){

                            try{

                                msg = "";

                                arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                if(arr2 == null){
                                    
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                }
                                if(arr2 == "B" || arr2 == "W"){
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    j=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(k = 1; k < 9; k++){

                            try{

                                msg = "";

                                arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                if(arr3 == null){
                                    
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";  
                                }
                                if(arr3 == "B" || arr3 == "W"){
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                    k=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                        for(l = 1; l < 9; l++){

                            try{

                                msg = "";

                                arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                if(arr4 == null){
                                    
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";  
                                }
                                if(arr4 == "B" || arr4 == "W"){
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                    l=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                    }


                    if(color == "B"){

                        console.log(lastId);

                        console.log(ahead ," - ahead")
                        console.log(behind ," - behind")
                        console.log(up ," - up")
                        console.log(below ," - below")


                        
                        for (i = 1; i <= ahead; i++){
                            arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                            if(arr1 == null){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                            }
                            if(arr1 == "W" || arr1 == "B"){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                i=9
                            }
                        }



                        for (j = 1; j <= behind; j++){
                            arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                            if(arr2 == null){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                            }
                            if(arr2 == "W" || arr2 == "B"){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                j=9
                            }
                        }



                        for (k = 1; k <= below; k++){
                            arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()
                            console.log(k,"------------------")
                            if(arr3 == null){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                            }
                            if(arr3 == "W" || arr3 == "B"){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                k=9;
                            }
                        }
                


                        for (l = 1; l <= up; l++){
                            arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                            if(arr4 == null){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                            }
                            if(arr4 == "W" || arr4 == "B"){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                l=9
                            }
                        }
                        for(i = 1; i < 9; i++){

                            try{

                                msg = "";

                                arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                if(arr1 == null){
                                    
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                }
                                if(arr1 == "W" || arr1 == "B"){
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    i=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(j = 1; j < 9; j++){

                            try{

                                msg = "";

                                arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                if(arr2 == null){
                                    
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                }
                                if(arr2 == "W" || arr2 == "B"){
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    j=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(k = 1; k < 9; k++){

                            try{

                                msg = "";

                                arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                if(arr3 == null){
                                    
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";  
                                }
                                if(arr3 == "W" || arr3 == "B"){
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                    k=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                        for(l = 1; l < 9; l++){

                            try{

                                msg = "";

                                arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                if(arr4 == null){
                                    
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";  
                                }
                                if(arr4 == "W" || arr4 == "B"){
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                    l=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }




                    }
                    break
                
                    case(`${color}-King`):
                    ahead = 1;
                    behind = 1;
                    below = 1;
                    up = 1;
                    if(color == "W"){

                        console.log(lastId);


                        console.log(ahead ," - ahead")
                        console.log(behind ," - behind")
                        console.log(up ," - up")
                        console.log(below ," - below")



                        for (i = 1; i <= ahead; i++){
                            if(document.getElementById(`${row}-${col+i}`) !== null){
                                arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                                if(arr1 == ""){
                                    document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                }
                                if(arr1 == "B" || arr1 == "W"){
                                    document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                    i=9
                                }
                            }

                        }



                        for (j = 1; j <= behind; j++){
                            if(document.getElementById(`${row}-${col-j}`) !== null){
                                arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                                if(arr2 == ""){
                                    document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                }
                                if(arr2 == "B" || arr2 == "W"){
                                    document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                    j=9
                                }
                            }

                        }



                        for (k = 1; k <= below; k++){
                            if(document.getElementById(`${row+k}-${col}`) !== null){
                                arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()

                                if(arr3 == ""){
                                    document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                }
                                if(arr3 == "B" || arr3 == "W"){
                                    document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                    k=9;
                                }
                            }

                        }
                


                        for (l = 1; l <= up; l++){
                            if(document.getElementById(`${row-l}-${col}`) !== null){
                                arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                                if(arr4 == ""){
                                    document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                }
                                if(arr4 == "B" || arr4 == "W"){
                                    document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                    l=9
                                }
                            }

                        }

                        for(i = 1; i < 2; i++){

                            try{

                                msg = "";

                                arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                if(arr1 == null){
                                    
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                }
                                if(arr1 == "B" || arr1 == "W"){
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    i=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(j = 1; j < 2; j++){

                            try{

                                msg = "";

                                arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                if(arr2 == null){
                                    
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                }
                                if(arr2 == "B" || arr2 == "W"){
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    j=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(k = 1; k < 2; k++){

                            try{

                                msg = "";

                                arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                if(arr3 == null){
                                    
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";
                                }
                                if(arr3 == "B" || arr3 == "W"){
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                    k=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                        for(l = 1; l < 2; l++){

                            try{

                                msg = "";

                                arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                if(arr4 == null){
                                    
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";
                                }
                                if(arr4 == "B" || arr4 == "W"){
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                    l=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                    }


                    if(color == "B"){

                        console.log(lastId);

                        console.log(ahead ," - ahead")
                        console.log(behind ," - behind")
                        console.log(up ," - up")
                        console.log(below ," - below")


                        
                        for (i = 1; i <= ahead; i++){
                            arr1 = (Array.from(document.getElementById(`${row}-${col+i}`).innerText)).shift()
                            if(arr1 == null){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                i=9
                            }
                            if(arr1 == "W" || arr1 == "B"){
                                document.getElementById(`${row}-${col+i}`).style.backgroundColor = "green";
                                i=9
                            }
                        }



                        for (j = 1; j <= behind; j++){
                            arr2 = (Array.from(document.getElementById(`${row}-${col-j}`).innerText)).shift()
                            if(arr2 == null){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                j=9
                            }
                            if(arr2 == "W" || arr2 == "B"){
                                document.getElementById(`${row}-${col-j}`).style.backgroundColor = "green";
                                j=9
                            }
                        }



                        for (k = 1; k <= below; k++){
                            arr3 = (Array.from(document.getElementById(`${row+k}-${col}`).innerText)).shift()
                            console.log(k,"------------------")
                            if(arr3 == null){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                k=9
                            }
                            if(arr3 == "W" || arr3 == "B"){
                                document.getElementById(`${row+k}-${col}`).style.backgroundColor = "green";
                                k=9;
                            }
                        }
                


                        for (l = 1; l <= up; l++){
                            arr4 = (Array.from(document.getElementById(`${row-l}-${col}`).innerText)).shift()
                            if(arr4 == null){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                l=9
                            }
                            if(arr4 == "W" || arr4 == "B"){
                                document.getElementById(`${row-l}-${col}`).style.backgroundColor = "green";
                                l=9
                            }
                        }
                        for(i = 1; i < 2; i++){

                            try{

                                msg = "";

                                arr1 = (Array.from(document.getElementById(`${row-i}-${col-i}`).innerText)).shift();
                                if(arr1 == null){
                                    
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                }
                                if(arr1 == "W" || arr1 == "B"){
                                    document.getElementById(`${row-i}-${col-i}`).style.backgroundColor = "green"; // UP L
                                    i=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(j = 1; j < 2; j++){

                            try{

                                msg = "";

                                arr2 = (Array.from(document.getElementById(`${row-j}-${col+j}`).innerText)).shift();
                                if(arr2 == null){
                                    
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                }
                                if(arr2 == "W" || arr2 == "B"){
                                    document.getElementById(`${row-j}-${col+j}`).style.backgroundColor = "green"; // UP r
                                    j=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }


                        for(k = 1; k < 2; k++){

                            try{

                                msg = "";

                                arr3 = (Array.from(document.getElementById(`${row+k}-${col-k}`).innerText)).shift();
                                if(arr3 == null){
                                    
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green";  
                                }
                                if(arr3 == "W" || arr3 == "B"){
                                    document.getElementById(`${row+k}-${col-k}`).style.backgroundColor = "green"; // down left
                                    k=2
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }

                        for(l = 1; l < 2; l++){

                            try{

                                msg = "";

                                arr4 = (Array.from(document.getElementById(`${row+l}-${col+l}`).innerText)).shift();
                                if(arr4 == null){
                                    
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green";  
                                }
                                if(arr4 == "W" || arr4 == "B"){
                                    document.getElementById(`${row+l}-${col+l}`).style.backgroundColor = "green"; // down left
                                    l=9
                                }

                            }
                            catch(err){

                                msg = "Input is" + err;
                                console.log(msg);
                            }

                        }




                    }
                    break
                    
                }

                //check for illegal moves ad highlight them
                document.querySelectorAll(".tile").forEach(tile => {

                    W_B = (Array.from(tile.innerText)).shift();
                    if(tile.style.backgroundColor == "green" && W_B == color){
                        tile.style.backgroundColor = "red";
                        console.log("paint red")
                    }
                })
            }
        }

        //If selected is the same tile, unselect
        else if(selection === tile){

            //reset tile colors
            paintTiles();

            //remove selection;
            selection = null;

        }

        //MOVING
        //check if clicked on green without text
        if(tile.style.backgroundColor == "green" && tile.innerText == ""){
            
            //remove old tile txt
            document.getElementById(id).innerText = "";

            //set green tile txt to selected txt
            tile.innerText = txt;
                                                     
            //update images
            upload_Images();

            //remove selected item
            selection = null;

            //update tile coloring
            paintTiles();
            toggle++

            //Initiate AI move
            InitiateAI()
        }

        //check if clicked on green with text
        else if (tile.style.backgroundColor == "green" && tile.innerText !== ""){
            
            //get tiles first letter
            green_letter = (Array.from(tile.innerText)).shift();
            
            //check if valid
            if(green_letter !== selected_letter){
                //remove old tile txt
                document.getElementById(id).innerText = "";

                //set green tile txt to selected txt
                tile.innerText = txt;
                                     
                //update images
                upload_Images();

                //remove selected item
                selection = null;

                //update tile coloring
                paintTiles();
                toggle++;

                //Initiate AI move
                InitiateAI()
                
            }
            if(green_letter == selected_letter){
                console.log("ILLEGAL")
                
            }
        }
    })
})

//checks who turn, return true of black turn, false if white
function whoTurn(toggle){
    
    //check whos turn
    if(toggle % 2 !== 0){

        //update text
        document.getElementById("h").innerText = "whites turn";
        console.log("whites turn");

        return false;
    }
    else if(toggle % 2 == 0){

        //update text
        document.getElementById("h").innerText = "blacks turn";
        return true;
        
    }

}
