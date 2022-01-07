class Model {
    matrix = new Array(7);
    firstPlayerToplay = true;
    gameOver = false;

    constructor(){}

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

    clearMatrix(){
        this.matrix = [];
    }

    showMatrix(){
        console.log(this.matrix);
    }

    isRowFull(row){
        for (let line = 0; line < 6; ++line){
            if (this.matrix[line][row] == 0) return false;
        }
        return true;
    }

    findFirstEmptySpot(row){
        for (let line = 5; line >= 0; --line){
            console.log("Line : " + line);
            if (this.matrix[line][row] == 0) return line;
        }
    }

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

    evaluatePosisition(){
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

                numberOfConnections = this.exploreForConnects(line, row, 2);
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

    miniMax (position, depth, alpha, beta, maximizingPlayerOne){
        if (depth == 0){

        }
    }

    checkWin(player, board){
        for (let line = 0; line < 5; ++line){
            for (let row = 0; row < 6; ++row){
                if (board[line][row] == player){
                    if (this.exploreForConnects(line, row, player) == 4) return true;
                }
            }
        }
    }

    playTurn(row){
        if (this.isRowFull(row)) return;

        let player;
        if (this.firstPlayerToplay) player = 1;
        else player =2;

        this.matrix[this.findFirstEmptySpot(row)][row] = player;

        this.gameOver = this.checkWin(player, this.matrix);

        this.firstPlayerToplay = !this.firstPlayerToplay;
    }

    gameEngine(){
        let input;
        
        while (this.gameEngine){
            this.showMatrix();
            console.log("Select a row from 0 to 6");
            input = prompt();
            if (input == "kill") break;
            this.playTurn(input);
        }

        console.log(this.gameOver);
        this.showMatrix();
        
        
    }
}

const model = new Model();
model.clearMatrix();
model.createMatrix();
model.gameEngine();

