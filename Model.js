class Model {
    constructor(){
        this.matrix = new Array(6);
        this.firstPlayerToPlay = true;
        this.gameOver = false;
        this.botTurn = 2;
        this.botDepth = 10;

        this.createMatrix();
        this.setBotTurn(0);
        //this.testEvaluatePosition();
    }

    // Bindings
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
    }

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

    removeMatrixElement(line, row){
        this.matrix[line][row] = 0;
    }

    getFirstPlayerToPlay(){
        return this.firstPlayerToPlay;
    }

    // This function is used for tests
    showMatrix(){
        console.log(this.matrix);
    }

    // Clear the matrix and reset the game options
    resetGame(){
        this.clearMatrix();
        this.gameOver = false;
        this.firstPlayerToPlay = true;
        this.applyOptions();
    }

    // Check if the row is full
    isRowFull(row){ 
        if (this.matrix[0][row] == 0) return false;
        else return true;
    }

    // Find and return the index of the first line available in the row (starting from the bottom)
    findFirstEmptySpot(row){ 
        for (let line = 5; line >= 0; --line){
            if (this.matrix[line][row] == 0) return line;
        }
    }

    // Explore the 8 directions from a specific token and return the number of connected tokens
    exploreForConnects(line, row,  player){
        if (this.matrix[line][row] != player) return 0; //If the current token ain't a player we don't need to test the directions
        let connectedTokens = 1;
        let currentLine = line;
        let currentRow = row;
        let maxConnectedTokens = 1;
        // The 8 directions are organized in clockwise starting from the top left

        // Top left
        while (currentLine - 1 >= 0 && currentRow - 1 >= 0 && this.matrix[currentLine - 1][currentRow - 1] == player){
            ++connectedTokens;
            --currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        };

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Top
        while (currentLine - 1 >= 0 && this.matrix[currentLine - 1][currentRow] == player){
            ++connectedTokens;
            --currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Top right
        while (currentLine - 1 >= 0 && currentRow + 1 <= 6 && this.matrix[currentLine - 1][currentRow + 1] == player){
            ++connectedTokens;
            --currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Right
        while (currentRow + 1 <= 6 && this.matrix[currentLine][currentRow + 1] == player){
            ++connectedTokens;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Bottom right
        while (currentLine + 1 <= 5 && currentRow + 1 <= 6 && this.matrix[currentLine + 1][currentRow + 1] == player){
            ++connectedTokens;
            ++currentLine;
            ++currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Bottom
        while (currentLine + 1 <= 5 && this.matrix[currentLine + 1][currentRow] == player){
            ++connectedTokens;
            ++currentLine;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Bottom left
        while(currentLine + 1 <= 5 && currentRow - 1 >= 0 && this.matrix[currentLine + 1][currentRow - 1] == player){
            ++connectedTokens;
            ++currentLine;
            --currentRow;
            if (connectedTokens > maxConnectedTokens) maxConnectedTokens = connectedTokens;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        // Left
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

        for (let line = 0; line < 6; ++line){
            for ( let row = 0; row < 7; ++row){
                numberOfConnections = this.exploreForConnects(line, row, 1);
                switch (numberOfConnections){
                    case 2:
                        firstPlayerScore += 10;
                        break;

                    case 3: 
                        firstPlayerScore += 30;
                        break;

                    case 4:
                        firstPlayerScore += 9999;
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
                        secondPlayerScore += 9999;
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
                    // A player wins if he has 4 connected tokens
                    if (this.exploreForConnects(line, row, player) == 4) return true;
                }
            }
        }
        return false;
    }

    // Check if the board is full
    checkTie(){
        for (let row = 0; row < 7; ++row){
            if (!this.isRowFull(row)) return false;
        }
        return true;
    }

    // Return a 1D matrix containing the current available rows
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

    // Function that setups a bot's turn
    async playBotTurn(){
        let player;
        if (this.firstPlayerToPlay) player = 1;
        else player = 2;
        if (player != this.botTurn) return;
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
        this.gameOver = this.checkWin(this.botTurn);
        if (this.gameOver) console.log("Player " + this.botTurn + " won !");
        this.firstPlayerToPlay = !this.firstPlayerToPlay;
    }

    changeButtonColor(player){
        this.b0 = document.getElementById('b0');
        this.b1 = document.getElementById('b1');
        this.b2 = document.getElementById('b2');
        this.b3 = document.getElementById('b3');
        this.b4 = document.getElementById('b4');
        this.b5 = document.getElementById('b5');
        this.b6 = document.getElementById('b6');
        if (player == 2)
        {
            b0.style.backgroundColor='red';
            b1.style.backgroundColor='red';
            b2.style.backgroundColor='red';
            b3.style.backgroundColor='red';
            b4.style.backgroundColor='red';
            b5.style.backgroundColor='red';
            b6.style.backgroundColor='red';
        }   
        else
        {
            b0.style.backgroundColor='yellow';
            b1.style.backgroundColor='yellow';
            b2.style.backgroundColor='yellow';
            b3.style.backgroundColor='yellow';
            b4.style.backgroundColor='yellow';
            b5.style.backgroundColor='yellow';
            b6.style.backgroundColor='yellow';      
        }
    }


    // Function that setups a player's turn
    async playTurn(row){
        let player;
        if (this.firstPlayerToPlay) player = 1;
        else player = 2;

        if (this.gameOver) return;

        if (player == this.botTurn){
            await this.playBotTurn();
            return;
        }

        this.changeButtonColor(player);

        if (this.isRowFull(row)) return;

        let line = this.findFirstEmptySpot(row)

        this.setMatrixElement(line , row, player);

        console.log("Eval : " + this.evaluatePosisition());

        await this.addToken(line, row, player);

        this.gameOver = this.checkWin(player);

        if (this.gameOver) console.log("Player " + player + " won !");

        this.firstPlayerToPlay = !this.firstPlayerToPlay;
    }

    // Function of test
    testEvaluatePosition(){
        this.matrix = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,2,0,1,0,0,0],
            [0,2,1,2,0,2,0],
            [0,1,2,1,1,2,1],
            [2,1,1,2,1,1,2]
        ];
        console.log(this.evaluatePosisition());
        this.showMatrix();
    }
}

export {Model};