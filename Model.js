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

    exploreForConnects(line, row, player){
        let connectedTokens = 1;
        let currentLine = line;
        let currentRow = row;
        while (currentLine != 0 && currentRow != 0 && this.matrix[currentLine - 1][currentRow - 1] == player){
            ++connectedTokens;
            --currentLine;
            --currentRow;
            if (connectedTokens == 4) return true;
            console.log("Test 1");
        };

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 0 && this.matrix[currentLine - 1][currentRow] == player){
            ++connectedTokens;
            --currentLine;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 0 && currentRow != 6 && this.matrix[currentLine - 1][currentRow + 1] == player){
            ++connectedTokens;
            --currentLine;
            ++currentRow;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentRow != 6 && this.matrix[currentLine][currentRow + 1] == player){
            ++connectedTokens;
            ++currentRow;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 5 && currentRow != 6 && this.matrix[currentLine + 1][currentRow + 1] == player){
            console.log("Entree while");
            ++connectedTokens;
            ++currentLine;
            ++currentRow;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while (currentLine != 5 && this.matrix[currentLine + 1][currentRow] == player){
            ++connectedTokens;
            ++currentLine;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentLine != 5 && currentRow != 0 && this.matrix[currentLine + 1][currentRow - 1] == player){
            ++connectedTokens;
            ++currentLine;
            --currentRow;
            if (connectedTokens == 4) return true;
        }

        connectedTokens = 1;
        currentLine = line;
        currentRow = row;
        while(currentRow != 0 && this.matrix[currentLine][currentRow - 1] == player){
            ++connectedTokens;
            --currentRow;
            if (connectedTokens == 4) return true;
        }
        return false;
    }

    checkWin(player){
        for (let line = 0; line < 6; ++line){
            for (let row = 0; row < 7; ++row){
                if (this.matrix[line][row] == player){
                    if (this.exploreForConnects(line, row, player)) return true;
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

        this.gameOver = this.checkWin(player);

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

