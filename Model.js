class Model {
    constructor(){
        this.matrix = new Array(6);
        this.firstPlayerToPlay = true;
        this.gameOver = false;
        this.botTurn = 2;
        this.botDepth = 5;

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
        console.log(line, row, value);
        this.matrix[line][row] = value;
    }

    removeMatrixElement(line, row){
        console.log(line, row);
        this.matrix[line][row] = 0;
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
    isRowFull(row){ 
        for (let line = 0; line < 6; ++line){
            if (this.matrix[line][row] == 0) return false;
        }
        return true;
    }

    // Find and return the position of the first line available in the row (starting from the bottom)
    findFirstEmptySpot(row){ 
        for (let line = 5; line >= 0; --line){
            if (this.matrix[line][row] == 0) return line;
        }
    }

    // Explore the 8 directions from a specific token and return the number of connected tokens
    exploreForConnects(line, row,  player){
        let connectedTokens = 1;
        let currentLine = line;
        let currentRow = row;
        let maxConnectedTokens = 1;
        while (currentLine - 1 >= 0 && currentRow - 1 >= 0 && this.matrix[currentLine - 1][currentRow - 1] == player){
            ++connectedTokens;
            --currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        };

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine - 1 >= 0 && this.matrix[currentLine - 1][currentRow] == player){
            ++connectedTokens;
            --currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine - 1 >= 0 && currentRow + 1 <= 6 && this.matrix[currentLine - 1][currentRow + 1] == player){
            ++connectedTokens;
            --currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentRow + 1 <= 6 && this.matrix[currentLine][currentRow + 1] == player){
            ++connectedTokens;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine + 1 <= 5 && currentRow + 1 <= 6 && this.matrix[currentLine + 1][currentRow + 1] == player){
            ++connectedTokens;
            ++currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine + 1 <= 5 && this.matrix[currentLine + 1][currentRow] == player){
            ++connectedTokens;
            ++currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentLine + 1 <= 5 && currentRow - 1 >= 0 && this.matrix[currentLine + 1][currentRow - 1] == player){
            ++connectedTokens;
            ++currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentRow - 1 >= 0 && this.matrix[currentLine][currentRow - 1] == player){
            ++connectedTokens;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }
        return maxConnectedTokens;
    }

    // Read a board game and return a score depending on the number of connected tokens from each player
    evaluatePosisition(){

        if (this.checkTie()) return 0;

        let firstPlayerScore = 0;
        let secondPlayerScore = 0;
        let globalScore = 0;
        let numberOfConnections = 1;

        for (let line = 0; line < 5; ++line){
            for ( let row = 0; row < 6; ++row){
                numberOfConnections = this.exploreForConnects(line, row, 1);
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

                numberOfConnections = this.exploreForConnects(line, row,  2);
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
    checkWin(player){
        for (let line = 0; line < 6; ++line){
            for (let row = 0; row < 7; ++row){
                if (this.matrix[line][row] == player){
                    if (this.exploreForConnects(line, row, player) == 4) return true;
                }
            }
        }
        return false;
    }

    // Check if there is a legal move to play
    checkTie(){
        for (let row = 0; row < 7; ++row){
            if (!this.isRowFull(row)) return false;
        }
        return true;
    }

    getAvailableRow(){
        let rows = [];
        for (let i = 0; i < 7; ++i){
            if (this.matrix[0][i] == 0){
                rows.push(i);
            }
        }
        return rows;
    }

    // Main recursive function of the bot that finds the best way to play
    miniMax (depth, alpha, beta, maximizingPlayerOne){
        console.log("Enter miniMax");
        if (depth == 0 || this.checkWin(1) || this.checkWin(2)){
            return this.evaluatePosisition();
        }

        let maxEval;
        let minEval;
        let evaluation;
        let rows;
        let player;
        let line;

        if (maximizingPlayerOne){
            maxEval = -Infinity;
            player = 1;

            rows = this.getAvailableRow();
            for (let row of rows){
                line = this.findFirstEmptySpot(row);
                this.setMatrixElement(line, row, player);
                evaluation = this.miniMax(depth - 1, alpha, beta, false);
                this.removeMatrixElement(line, row);
                if (evaluation > maxEval) maxEval = evaluation;
                if (evaluation > alpha) alpha = evaluation;
                if (beta <= alpha) break;
            }
            return maxEval;
        }
        else {
            minEval = Infinity;
            player = 2;

            rows = this.getAvailableRow();
            for (let row of rows){
                line = this.findFirstEmptySpot(row);
                this.setMatrixElement(line, row, player);
                evaluation = this.miniMax(depth - 1, alpha, beta, true);
                this.removeMatrixElement(line, row);
                if (evaluation < minEval) minEval = evaluation;
                if (evaluation < beta) beta = evaluation;
                if (beta <= alpha) break;
            } 
            return minEval;
        }
    }

    async playBotTurn(){
        console.log("Enter playBotTurn");
        let rows = this.getAvailableRow();
        let evaluation;
        let maxEval;
        let botPlay = -1;
        let alpha = -Infinity;
        let beta = Infinity;
        let line;

        if (this.botTurn == 1){
            maxEval = -Infinity;
            for (let row of rows){
                line = this.findFirstEmptySpot(row);
                this.setMatrixElement(line, row, this.botTurn);
                evaluation = this.miniMax(this.botDepth - 1, alpha, beta, false)
                this.removeMatrixElement(line, row);
                if (evaluation > maxEval){
                    maxEval = evaluation;
                    botPlay = row;
                }
                if (evaluation > alpha) alpha = evaluation;
                if (beta <= alpha) break;
            }
        }
        else{
            maxEval = Infinity;
            for (let row of rows){
                line = this.findFirstEmptySpot(row);
                this.setMatrixElement(line, row, this.botTurn);
                evaluation = this.miniMax(this.botDepth - 1, alpha, beta, true)
                this.removeMatrixElement(line, row);
                if (evaluation < maxEval){
                    maxEval = evaluation;
                    botPlay = row;
                }
                if (evaluation < beta) beta = evaluation;
                if (beta <= alpha) break;
            }
        }

        let finalLine = this.findFirstEmptySpot(botPlay);
        this.setMatrixElement(finalLine, botPlay, this.botTurn);
        await this.addToken(finalLine, botPlay, this.botTurn);
        console.log(this.matrix);
        this.gameOver = this.checkWin(this.botTurn);
        if (this.gameOver) console.log("Player " + this.botTurn + " won !");
    }

    // Allow a player to play his turn
    async playTurn(row){
        console.log("Enter playTurn");
        let player;
        if (this.firstPlayerToPlay) player = 1;
        else player = 2;

        if (this.gameOver) return;

        if (player == this.botTurn){
            await this.playBotTurn();
            this.firstPlayerToPlay = !this.firstPlayerToPlay;
            return;
        }

        if (this.isRowFull(row)) return;

        let line = this.findFirstEmptySpot(row)

        this.setMatrixElement(line , row, player);

        await this.addToken(line, row, player);

        this.gameOver = this.checkWin(player);

        if (this.gameOver) console.log("Player " + player + " won !");

        this.firstPlayerToPlay = !this.firstPlayerToPlay;
    }
}

export {Model};