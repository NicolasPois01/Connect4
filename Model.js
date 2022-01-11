class Model {
    matrix = new Array(7);
    firstPlayerToPlay = true;
    gameOver = false;
    botTurn = 2; //The bot plays as second player by default
    botDepth = 5;

    constructor(){}

    //Create the empty board game
    createMatrix(){ 
        for (let line = 0; line < 6; ++line){
            this.matrix[line] = new Array(7);
        }
        for (let line = 0; line < 6; ++line){
            for (let row = 0; row < 7; ++row){
                this.matrix[line][row] = 0;
            }
        }
    }

    setBotTurn(turn){
        this.botTurn = turn;
    }

    //Empty the board
    clearMatrix(){ 
        this.matrix = [];
    }

    // Display the actual state of the game
    showMatrix(){
        console.log(this.matrix);
    }

    // Check if the row is full
    isRowFull(board, row){ 
        for (let line = 0; line < 6; ++line){
            if (board[line][row] == 0) return false;
        }
        return true;
    }

    // Find and return the position of the first line available in the row (starting from the bottom)
    findFirstEmptySpot(board, row){ 
        for (let line = 5; line >= 0; --line){
            console.log("Line : " + line);
            if (board[line][row] == 0) return line;
        }
    }

    // Explore the 8 directions from a specific token and return the number of connected tokens
    exploreForConnects(line, row, board, player){
        let connectedTokens = 1;
        let currentLine = line;
        let currentRow = row;
        let maxConnectedTokens = 1;
        while (currentLine != 0 && currentRow != 0 && board[currentLine - 1][currentRow - 1] == player){
            ++connectedTokens;
            --currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        };

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 0 && board[currentLine - 1][currentRow] == player){
            ++connectedTokens;
            --currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 0 && currentRow != 6 && board[currentLine - 1][currentRow + 1] == player){
            ++connectedTokens;
            --currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentRow != 6 && board[currentLine][currentRow + 1] == player){
            ++connectedTokens;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 5 && currentRow != 6 && board[currentLine + 1][currentRow + 1] == player){
            ++connectedTokens;
            ++currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 5 && board[currentLine + 1][currentRow] == player){
            ++connectedTokens;
            ++currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentLine != 5 && currentRow != 0 && board[currentLine + 1][currentRow - 1] == player){
            ++connectedTokens;
            ++currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentRow != 0 && board[currentLine][currentRow - 1] == player){
            ++connectedTokens;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }
        return maxConnectedTokens;
    }

    // Read a board game and return a score depending on the number of connected tokens from each player
    evaluatePosisition(board){
        let firstPlayerScore = 0;
        let secondPlayerScore = 0;
        let globalScore = 0;
        let numberOfConnections = 1;

        for (let line = 0; line < 5; ++line){
            for ( let row = 0; row < 6; ++row){
                numberOfConnections = this.exploreForConnects(line, row, board, 1);
                switch (numberOfConnections){
                    case 2:
                        firstPlayerScore += 10;
                        break;

                    case 3: 
                        firstPlayerScore += 30;
                        break;

                    case 4:
                        firstPlayerScore += 999;
                }

                numberOfConnections = this.exploreForConnects(line, row, board, 2);
                switch (numberOfConnections){
                    case 2:
                        secondPlayerScore += 10;
                        break;

                    case 3:
                        secondPlayerScore += 30;
                        break;

                    case 4:
                        secondPlayerScore += 999;
                        break;
                }
            }
        }
        globalScore = firstPlayerScore - secondPlayerScore;
        return globalScore;
    }

    // Check if a player has 4 connected tokens on the board
    checkWin(player, board){
        for (let line = 0; line < 5; ++line){
            for (let row = 0; row < 6; ++row){
                if (board[line][row] == player){
                    if (this.exploreForConnects(line, row, board, player) == 4) return true;
                }
            }
        }
        return false;
    }

    // Generate and return a 4D array containing every possible next position from a board (3D) and the row used to get the new position
    getChildrenOfPosition(board, player){
        children = new Array(new Array(new Array(new Array())));
        let i = 0;
        for (let row = 0; row < 7; ++row){
            if (!this.isRowFull(board, row)){
                children[0][i] = board; 
                children[0][i][this.findFirstEmptySpot(board, row)][row] = player;
                children[1] = i;
                ++i;
            }
        }
        return children; 
        // children[0] contains the array of the 0-7 next possible positions
        // children[1] contains the row used to reach those positions
    }

    // Main recursive function of the bot that finds the best way to play
    miniMax (board, depth, alpha, beta, maximizingPlayerOne){
        if (depth == 0 || this.checkWin(1, board) || this.checkWin(2, board)){
            return this.evaluatePosisition(board);
        }

        let maxEval;
        let minEval;
        let evaluation;
        let player;
        let children;
        let lastRow;

        if (maximizingPlayerOne){
            maxEval = -9999;
            player = 1;

            children = this.getChildrenOfPosition(board, player);
            for (let child in children){
                evaluation = this.miniMax(child[0], depth - 1, alpha, beta, false);
                if (evaluation > maxEval) {
                    maxEval = evaluation;
                    if (depth == 1) lastRow = child[1];
                }

                if (evaluation > alpha) alpha = evaluation;
                if (beta <= alpha) break;
            }
            return maxEval;
        }
        else {
            minEval = 9999;
            player = 2;

            children = this.getChildrenOfPosition(board, player);
            for (let child in children){
                evaluation = this.miniMax(child, depth - 1, alpha, beta, true);
                if (evaluation < minEval){
                    minEval = evaluation;
                    if (depth == 1) lastRow = child[1];
                }
                if (evaluation < beta) beta = evaluation;
                if (beta <= alpha) break;
            } 
            return minEval;
        }
    }

    // Allow a player to play his turn
    playTurn(row, player){
        if (this.isRowFull(this.matrix, row)) return;

        this.matrix[this.findFirstEmptySpot(this.matrix, row)][row] = player;

        this.gameOver = this.checkWin(player, this.matrix);

        this.firstPlayerToPlay = !this.firstPlayerToPlay;
    }

    // Main function of the program. Breaks when the game is over
    gameEngine(){
        let input;

        while (!this.gameOver){

            let player;
            if (this.firstPlayerToPlay) player = 1;
            else player = 2;

            if (this.botTurn != player){ // Turn of a player
                input = -1;
                this.showMatrix();
                while (input < 0 || input > 6){
                    console.log("Select a row from 0 to 6");
                    input = prompt();
                }
                while (this.isRowFull(this.matrix, input)){
                    console.log("Select a row from 0 to 6");
                    input = prompt();
                }
                this.playTurn(input, player);
            }


            if (input == "kill") break;
        }

        console.log(this.gameOver);
        this.showMatrix();


    }
}

const model = new Model();
model.clearMatrix();
model.createMatrix();
model.setBotTurn(0);
model.gameEngine();
