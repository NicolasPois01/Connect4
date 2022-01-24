class Model {
    constructor(){
        this.matrix = new Array(6);
        this.firstPlayerToPlay = true;
        this.gameOver = false;
        this.botTurn = 2;
        this.botDepth = 5;
        this.botPlay

        this.createMatrix();
        this.setBotTurn(0);
    }


    bindAddToken(callback){
        this.addToken = callback;
    }

    bindApplyOptions(callback){
        this.applyOptions = callback;
    }

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
        console.log(this.botTurn);
    }

    //Empty the board
    clearMatrix(){ 
        this.matrix = [];
        this.createMatrix();
    }

    getMatrix(){
        return this.matrix;
    }

    setMatrixElement(line, row, value){
        this.matrix[line][row] = value;
    }

    getFirstPlayerToPlay(){
        return this.firstPlayerToPlay;
    }

    // Display the actual state of the game
    showMatrix(){
        console.log(this.matrix);
    }

    resetGame(){
        this.clearMatrix();
        this.gameOver = false;
        this.firstPlayerToPlay = true;
        this.applyOptions();
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
            if (board[line][row] == 0) return line;
        }
    }

    // Explore the 8 directions from a specific token and return the number of connected tokens
    exploreForConnects(line, row, board, player){
        let connectedTokens = 1;
        let currentLine = line;
        let currentRow = row;
        let maxConnectedTokens = 1;
        while (currentLine - 1 >= 0 && currentRow - 1 >= 0 && board[currentLine - 1][currentRow - 1] == player){
            ++connectedTokens;
            --currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        };

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine - 1 >= 0 && board[currentLine - 1][currentRow] == player){
            ++connectedTokens;
            --currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine - 1 >= 0 && currentRow + 1 <= 6 && board[currentLine - 1][currentRow + 1] == player){
            ++connectedTokens;
            --currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentRow + 1 <= 6 && board[currentLine][currentRow + 1] == player){
            ++connectedTokens;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine + 1 <= 5 && currentRow + 1 <= 6 && board[currentLine + 1][currentRow + 1] == player){
            ++connectedTokens;
            ++currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine + 1 <= 5 && board[currentLine + 1][currentRow] == player){
            ++connectedTokens;
            ++currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentLine + 1 <= 5 && currentRow - 1 >= 0 && board[currentLine + 1][currentRow - 1] == player){
            ++connectedTokens;
            ++currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentRow - 1 >= 0 && board[currentLine][currentRow - 1] == player){
            ++connectedTokens;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }
        return maxConnectedTokens;
    }

    // Read a board game and return a score depending on the number of connected tokens from each player
    evaluatePosisition(board){

        if (this.checkTie(board)) return 0;

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
        for (let line = 0; line < 6; ++line){
            for (let row = 0; row < 7; ++row){
                if (board[line][row] == player){
                    if (this.exploreForConnects(line, row, board, player) == 4) return true;
                }
            }
        }
        return false;
    }

    // Check if there is a legal move to play
    checkTie(board){
        for (let row = 0; row < 7; ++row){
            if (!this.isRowFull(board, row)) return false;
        }
        return true;
    }

    // Generate and return a 3D array containing every possible next position from a board
    getChildrenOfPosition(board, player){
        children = new Array(new Array(new Array()));
        for (let row = 0; row < 7; ++row){
            if (!this.isRowFull(board, row)){
                children[row] = board; 
                children[row][this.findFirstEmptySpot(board, row)][row] = player;
            }
        }
        return children; 
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

        if (maximizingPlayerOne){
            maxEval = -9999;
            player = 1;

            children = this.getChildrenOfPosition(board, player);
            for (let child in children){
                evaluation = this.miniMax(child, depth - 1, alpha, beta, false);
                if (evaluation > maxEval) maxEval = evaluation;
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
                if (evaluation < minEval) minEval = evaluation;
                if (evaluation < beta) beta = evaluation;
                if (beta <= alpha) break;
            } 
            return minEval;
        }
    }

    async playBotTurn(){
        let evaluation;
        let maxEval;
        if (this.botTurn == 1) maxEval = -9999;
        else maxEval = 9999;
        let children = this.getChildrenOfPosition(this.matrix);

        for (let child in children){

        }
    }

    // Allow a player to play his turn
    async playTurn(row){
        let player;
        if (this.firstPlayerToPlay) player = 1;
        else player = 2;

        if (this.gameOver) return;

        if (player == this.botTurn){
            await this.playBotTurn();
        }

        if (this.isRowFull(this.matrix, row)) return;

        let line = this.findFirstEmptySpot(this.matrix, row)

        this.setMatrixElement(line , row, player);

        await this.addToken(line, row, player);

        this.gameOver = this.checkWin(player, this.matrix);

        if (this.gameOver) console.log("Player " + player + " won !");

        this.firstPlayerToPlay = !this.firstPlayerToPlay;
    }
}

export {Model};